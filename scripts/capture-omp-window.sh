#!/bin/bash
# Capture the frontmost Ghostty window as omp screenshot
# Usage: open omp in Ghostty, then run this script

set -e

OUT="/Users/yuzu/Documents/Projects/GitHub_Page/public/screenshots/omp.png"
TMP="/tmp/omp-capture"
mkdir -p "$TMP"

# Find Ghostty window bounds via Quartz
BOUNDS=$(/tmp/pil-venv/bin/python3 << 'PYEOF'
import Quartz
wl = Quartz.CGWindowListCopyWindowInfo(
    Quartz.kCGWindowListOptionOnScreenOnly | Quartz.kCGWindowListExcludeDesktopElements,
    Quartz.kCGNullWindowID
)
for w in wl:
    if "ghostty" in w.get("kCGWindowOwnerName", "").lower():
        b = w["kCGWindowBounds"]
        print(f"{int(b['X'])},{int(b['Y'])},{int(b['Width'])},{int(b['Height'])}")
        break
PYEOF
)

if [ -z "$BOUNDS" ]; then
  echo "Error: Ghostty window not found. Make sure Ghostty is open."
  exit 1
fi

echo "Capturing region: $BOUNDS"
screencapture -o -R"$BOUNDS" "$TMP/raw-capture.png"

# Post-process: crop, scale, save
/tmp/pil-venv/bin/python3 << 'PYEOF'
from PIL import Image
from pathlib import Path

src = Path("/tmp/omp-capture/raw-capture.png")
dst = Path("/Users/yuzu/Documents/Projects/GitHub_Page/public/screenshots/omp.png")

img = Image.open(src)
if img.mode == 'RGBA':
    img = img.convert('RGB')
arr = list(img.getdata())
w, h = img.size
bg = (30, 31, 41)

top, bottom, left, right = h, 0, w, 0
for y in range(h):
    for x in range(0, w, 2):
        idx = y * w + x
        r, g, b = arr[idx][:3]
        if abs(r - bg[0]) > 8 or abs(g - bg[1]) > 8 or abs(b - bg[2]) > 8:
            if y < top: top = y
            if y > bottom: bottom = y
            if x < left: left = x
            if x > right: right = x

cw, ch = right - left + 1, bottom - top + 1
cropped = img.crop((left, top, right + 1, bottom + 1))

target_w, target_h = round(3683 * 0.80), round(2016 * 0.80)
scale = min(target_w / cw, target_h / ch)
scaled_w, scaled_h = round(cw * scale), round(ch * scale)
scaled = cropped.resize((scaled_w, scaled_h), Image.LANCZOS)

new_img = Image.new("RGB", (3683, 2016), bg)
new_img.paste(scaled, ((3683 - scaled_w) // 2, (2016 - scaled_h) // 2))
new_img.save(dst)

print(f"Saved: {dst} ({dst.stat().st_size // 1024} KB)")
PYEOF
