"""
Adversarial review of Ghostty and Code Runner GIFs on the live site.
"""
from playwright.sync_api import sync_playwright
import json
import time

SITE_URL = "https://yuzu-octopus.github.io"
CACHE_BUST = f"?t={int(time.time())}"

def main():
    results = {
        "site_url": SITE_URL,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "issues": [],
        "gif_analysis": {},
        "screenshot_files": []
    }
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        # Navigate with cache busting
        print(f"Navigating to {SITE_URL}{CACHE_BUST}")
        page.goto(f"{SITE_URL}{CACHE_BUST}", wait_until="networkidle")
        page.wait_for_load_state("domcontentloaded")
        page.wait_for_timeout(2000)  # Wait for animations to start
        
        # Take full page screenshot
        full_screenshot = "/tmp/full_page.png"
        page.screenshot(path=full_screenshot, full_page=True)
        results["screenshot_files"].append(full_screenshot)
        print(f"Full page screenshot saved to {full_screenshot}")
        
        # Scroll to configs section
        page.evaluate("document.querySelector('#configs')?.scrollIntoView({behavior: 'instant'})")
        page.wait_for_timeout(1000)
        
        # Take screenshot of configs section
        configs_screenshot = "/tmp/configs_section.png"
        page.screenshot(path=configs_screenshot)
        results["screenshot_files"].append(configs_screenshot)
        print(f"Configs section screenshot saved to {configs_screenshot}")
        
        # Find all config cards
        config_cards = page.locator('.MuiCard-root').all()
        print(f"Found {len(config_cards)} config cards")
        
        # Analyze each card
        for i, card in enumerate(config_cards):
            card_title = card.locator('.MuiCardHeader-title').text_content()
            print(f"\nCard {i+1}: {card_title}")
            
            # Check for images/GIFs
            images = card.locator('img').all()
            gif_info = {"title": card_title, "images": []}
            
            for img in images:
                src = img.get_attribute('src') or ''
                alt = img.get_attribute('alt') or ''
                natural_width = img.evaluate('el => el.naturalWidth')
                natural_height = img.evaluate('el => el.naturalHeight')
                display_width = img.evaluate('el => el.getBoundingClientRect().width')
                display_height = img.evaluate('el => el.getBoundingClientRect().height')
                
                img_info = {
                    "src": src,
                    "alt": alt,
                    "natural_width": natural_width,
                    "natural_height": natural_height,
                    "display_width": display_width,
                    "display_height": display_height,
                    "aspect_ratio_match": abs((natural_width/natural_height) - (display_width/display_height)) < 0.1 if natural_height > 0 else False
                }
                gif_info["images"].append(img_info)
                
                print(f"  Image: {src[:80]}...")
                print(f"    Natural: {natural_width}x{natural_height}, Display: {display_width}x{display_height}")
                print(f"    Aspect ratio preserved: {img_info['aspect_ratio_match']}")
                
                # Check for GIF specifically
                if '.gif' in src.lower():
                    print(f"    ** GIF DETECTED **")
                    is_animated = img.evaluate('''el => {
                        return el.complete && el.naturalWidth > 0;
                    }''')
                    gif_info["is_gif"] = True
                    gif_info["potentially_animated"] = is_animated
                
                results["gif_analysis"][card_title] = gif_info
            
            # Check for 'Full Config' button
            full_config_btn = card.locator('button:has-text("Full Config"), a:has-text("Full Config")')
            btn_count = full_config_btn.count()
            if btn_count > 0:
                btn = full_config_btn.first
                is_visible = btn.is_visible()
                btn_text = btn.text_content()
                print(f"  Full Config button: visible={is_visible}, text='{btn_text}'")
                gif_info["full_config_button"] = {
                    "exists": True,
                    "visible": is_visible,
                    "text": btn_text
                }
            
            # Take screenshot of this specific card
            card_screenshot = f"/tmp/card_{i+1}_{card_title.replace(' ', '_').lower()[:20]}.png"
            card.screenshot(path=card_screenshot)
            results["screenshot_files"].append(card_screenshot)
            print(f"  Card screenshot saved to {card_screenshot}")
        
        # Check for MiMoCode specifically
        print("\n=== CHECKING MIMOCODE CARD ===")
        mimocode_card = page.locator('text=MiMoCode').first
        if mimocode_card.count() > 0:
            mimocode_card.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            
            mimocode_parent = mimocode_card.locator('xpath=ancestor::div[contains(@class, "MuiCard-root")]')
            if mimocode_parent.count() > 0:
                card = mimocode_parent.first
                
                mimocode_screenshot = "/tmp/mimocode_card.png"
                card.screenshot(path=mimocode_screenshot)
                results["screenshot_files"].append(mimocode_screenshot)
                print(f"MiMoCode card screenshot saved to {mimocode_screenshot}")
                
                btn = card.locator('button:has-text("Full Config"), a:has-text("Full Config")')
                if btn.count() > 0:
                    btn_visible = btn.first.is_visible()
                    btn_text = btn.first.text_content()
                    print(f"MiMoCode Full Config button: visible={btn_visible}, text='{btn_text}'")
                    
                    btn_style = btn.first.evaluate('''el => {
                        const style = window.getComputedStyle(el);
                        return {
                            display: style.display,
                            visibility: style.visibility,
                            opacity: style.opacity,
                            background: style.backgroundColor,
                            color: style.color,
                            padding: style.padding,
                            borderRadius: style.borderRadius
                        };
                    }''')
                    print(f"Button styles: {json.dumps(btn_style, indent=2)}")
                    
                    results["mimocode_button"] = {
                        "visible": btn_visible,
                        "text": btn_text,
                        "styles": btn_style
                    }
                else:
                    print("WARNING: MiMoCode card has no 'Full Config' button!")
                    results["issues"].append("MiMoCode card missing 'Full Config' button")
        
        browser.close()
    
    print("\n" + "="*60)
    print("ADVERSARIAL REVIEW SUMMARY")
    print("="*60)
    print(f"Total cards found: {len(config_cards)}")
    print(f"Issues found: {len(results['issues'])}")
    for issue in results['issues']:
        print(f"  - {issue}")
    print(f"\nScreenshots saved to: {', '.join(results['screenshot_files'])}")
    
    with open('/tmp/adversarial-review-results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\nDetailed results saved to /tmp/adversarial-review-results.json")

if __name__ == "__main__":
    main()
