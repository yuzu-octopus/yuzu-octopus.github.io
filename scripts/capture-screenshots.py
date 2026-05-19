#!/usr/bin/env python3

import subprocess, re, ipaddress, sys, os, json
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
OUT = PROJECT / "public/screenshots"
TMP = Path("/tmp/portfolio-screenshots")
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)
os.chdir(PROJECT)

IP_RE = re.compile(
    r'(?<!\d)(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?!\d)'
)

def _ip_replacer(m):
    ip = ipaddress.ip_address(m.group(0))
    if ip.is_loopback:
        return m.group(0)
    return "192.168.0.0" if ip.is_private else "1.2.3.4"

def sanitize(text):
    """Apply text replacements on raw content, preserving ANSI color codes."""
    # Strip cursor movement codes that cause rendering issues
    text = re.sub(r'\x1b\[\d+[ACG]', '', text)       # cursor up/right/column
    text = re.sub(r'\x1b\[\?[0-9]+[a-z]', '', text)  # private modes (?25l, ?7h)
    text = re.sub(r'\x1b\[1G', '', text)              # cursor to column 1
    # Remove carriage returns and control chars
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    text = re.sub(r'\x08', '', text)                  # backspace
    text = re.sub(r'\x04', '', text)                  # EOF (Ctrl-D)
    text = text.replace('^D', '')                     # literal ^D from script
    text = text.replace('\x1b[1m', '')                # bold on at start
    # Remove leading blank lines
    text = text.lstrip('\n')

    # Build position map: clean_char_idx -> original_char_idx
    clean_chars = []
    orig_chars = []
    i = 0
    while i < len(text):
        if text[i] == '\x1b':
            j = i + 1
            if j < len(text) and text[j] == '[':
                j += 1
                while j < len(text) and not text[j].isalpha():
                    j += 1
                j += 1
            elif j < len(text) and text[j] == ']':
                j += 1
                while j < len(text) and text[j] != '\x07':
                    j += 1
                j += 1
            elif j < len(text):
                j += 2
            i = j
        else:
            clean_chars.append(text[i])
            orig_chars.append(i)
            i += 1

    clean = ''.join(clean_chars)

    # Find all replacements needed in clean text
    replacements = []
    for pattern, repl in [
        (r'Yuzus-MacBook-Air', 'Macbook-Air'),
        (r"yuzu'?s? MacBook Air", "Wifi"),
        (r'\byuzu\b', 'user'),
        (r"[\w'\-]+\s*JBL\s+Tune\s+\d+BT", "Bluetooth Headphones"),
        (IP_RE.pattern, None),
        (r'[\w\'\-]+\s*[-–]\s*802\.11\w*', 'Wifi - 802.11'),
        (r'capture-screenshots\.py', 'nu'),
        (r'\.opencode', 'Ghostty'),
    ]:
        regex = re.compile(pattern)
        for m in regex.finditer(clean):
            if repl is None:
                repl_text = _ip_replacer(m)
            else:
                repl_text = repl
            replacements.append((m.start(), m.end(), repl_text))

    if not replacements:
        return text.strip()

    # Apply replacements in reverse order to preserve positions
    replacements.sort(key=lambda r: r[0], reverse=True)
    result = text
    for clean_start, clean_end, repl_text in replacements:
        orig_start = orig_chars[clean_start]
        orig_end = orig_chars[clean_end - 1] + 1
        result = result[:orig_start] + repl_text + result[orig_end:]

    return result.strip()

def capture(label, cmd_args):
    """Capture command output via script(1), sanitize, return path."""
    raw = TMP / f"raw-{label}.txt"
    san = TMP / f"san-{label}.txt"
    subprocess.run(
        ["script", "-q", str(raw)] + list(cmd_args),
        timeout=60,
    )
    content = open(raw, errors="replace").read()
    content = content.replace("\r\n", "\n").replace("\r", "\n")
    # Keep ANSI codes, apply sanitization
    open(san, "w").write(sanitize(content))
    return san

def crop_png(src, dst, crop_h, w):
    """Crop TOP portion of a PNG using PIL."""
    from PIL import Image
    img = Image.open(src)
    cropped = img.crop((0, 0, min(w, img.width), crop_h))
    cropped.save(dst)

def optimize_gif(path):
    """Optimize GIF with gifsicle to reduce file size."""
    tmp = path.with_suffix(".tmp.gif")
    # Try aggressive optimization
    subprocess.run(
        ["gifsicle", "-O3", "--colors", "64", "--dither", str(path), "-o", str(tmp)],
        capture_output=True, timeout=60,
    )
    if tmp.exists() and tmp.stat().st_size > 0:
        subprocess.run(["mv", str(tmp), str(path)])

def vhs(label, tape_lines, w=3840, h=2160, fs=14, gif=False, shell="zsh"):
    if gif:
        out_name = f"{label}.gif"
        frames_dir = None
        header = f"""Output {out_name}"""
    else:
        frames_rel = f".vhs-frames-{label}/"
        frames_dir = PROJECT / frames_rel
        if frames_dir.exists():
            subprocess.run(["rm", "-rf", str(frames_dir)])
        header = f"""Output {frames_rel}"""

    header += f"""
Set FontSize {fs}
Set Width {w}
Set Height {h}
Set FontFamily "JetBrainsMono Nerd Font Mono"
Set Theme "Dracula"
Set Shell "{shell}"
"""
    tape_path = TMP / f"tape-{label}.tape"
    open(tape_path, "w").write(header + "\n" + tape_lines + "\n")

    print(f"  ▶ {label}...", end=" ", flush=True)
    subprocess.run(["vhs", str(tape_path)], timeout=180)

    if gif:
        src = PROJECT / out_name
        dest = OUT / out_name
        if dest.exists():
            subprocess.run(["rm", "-rf", str(dest)])
        if src.exists():
            subprocess.run(["cp", str(src), str(dest)])
            subprocess.run(["rm", "-f", str(src)])
            optimize_gif(dest)
            sz = dest.stat().st_size // 1024
            print(f"done ({sz} KB)")
        else:
            print(f"FAILED (no gif)")
    else:
        candidates = sorted(frames_dir.glob("frame-text-*.png"))
        if candidates:
            final_frame = candidates[-1]
            dest = OUT / f"{label}.png"
            if dest.exists():
                subprocess.run(["rm", "-rf", str(dest)])
            subprocess.run(["cp", str(final_frame), str(dest)])
            sz = dest.stat().st_size // 1024
            print(f"done ({sz} KB)")
        else:
            print(f"FAILED (no frames)")

        subprocess.run(["rm", "-rf", str(frames_dir)])
        for p in PROJECT.glob(".vhs-frames-*"):
            if p.is_dir():
                subprocess.run(["rm", "-rf", str(p)])


# ============================================================
# 1. fastfetch — capture + sanitize + display (4K)
# ============================================================
print("1/4  fastfetch")
sf = capture("fastfetch", ["fastfetch"])
vhs("fastfetch", f"""Type "cls"
Enter
Sleep 0.5s
Type "cat {sf}"
Enter
Sleep 3s""", w=3840, h=2160, fs=24, shell="nu")

# ============================================================
# 2. starship — capture prompt output (4K)
# ============================================================
print("2/4  starship")
# Capture starship prompt directly
sf = capture("starship", ["starship", "prompt"])
vhs("starship", f"""Type "cls"
Enter
Sleep 0.5s
Type "cat {sf}"
Enter
Sleep 3s""", w=3840, h=2160, fs=24, shell="nu")
# Crop starship to just the prompt line (top portion after cat)
src = OUT / "starship.png"
if src.exists():
    cropped = TMP / "starship-cropped.png"
    crop_png(src, cropped, 120, 3690)
    subprocess.run(["mv", str(cropped), str(src)])

# ============================================================
# 3. ghostty — boo animation, trimmed with gifsicle (4K)
# ============================================================
print("3/4  ghostty")
vhs("ghostty", """Type "ghostty +boo"
Enter
Sleep 6s""", w=3840, h=2160, fs=28, gif=True, shell="zsh")

# ============================================================
# 4. opencode — live TUI at ~ (4K)
# ============================================================
print("4/4  opencode")
vhs("opencode", """Type "cd ~"
Enter
Sleep 1s
Type "opencode"
Enter
Sleep 5s""", w=3840, h=2160, fs=48, shell="zsh")

print("\nDone. Files in public/screenshots/:")
for p in sorted(OUT.glob("*.png")) + sorted(OUT.glob("*.gif")):
    print(f"  {p.name}  ({p.stat().st_size // 1024} KB)")
