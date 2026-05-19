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

def capture_fastfetch_side_by_side():
    """Capture fastfetch logo and info separately, combine side-by-side."""
    raw_logo = TMP / "raw-fastfetch-logo.txt"
    raw_info = TMP / "raw-fastfetch-info.txt"
    san = TMP / "san-fastfetch.txt"

    # Capture just the logo (no info)
    subprocess.run(
        ["script", "-q", str(raw_logo), "fastfetch", "--structure", "none"],
        timeout=60,
    )
    logo_text = open(raw_logo, errors="replace").read()
    logo_text = logo_text.replace("\r\n", "\n").replace("\r", "\n")
    # Clean control chars from logo
    logo_text = re.sub(r'\x04', '', logo_text)
    logo_text = re.sub(r'\x08', '', logo_text)
    logo_text = logo_text.replace('^D', '')
    logo_text = re.sub(r'\x1b\[1m', '', logo_text)
    logo_text = re.sub(r'\x1b\[1G', '', logo_text)
    logo_text = re.sub(r'\x1b\[\d+A', '', logo_text)
    logo_text = re.sub(r'\x1b\[\?[0-9]+[a-z]', '', logo_text)
    logo_text = re.sub(r'\x1b\[m', '', logo_text)

    # Extract logo lines, preserving ANSI color state across lines
    # Track the active color and inject it at the start of each line
    logo_lines = []
    active_color = ""
    for line in logo_text.split("\n"):
        stripped = line.rstrip()
        display = re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', stripped)
        if display.strip():
            # If this line has no color code, prepend the active color
            if not re.search(r'\x1b\[38;2;', stripped) and active_color:
                stripped = active_color + stripped
            # Update active color if this line sets one
            color_match = re.search(r'(\x1b\[38;2;\d+;\d+;\d+m)', stripped)
            if color_match:
                active_color = color_match.group(1)
            logo_lines.append(stripped)

    # Capture just the info (no logo)
    subprocess.run(
        ["script", "-q", str(raw_info), "fastfetch", "--logo-type", "none"],
        timeout=60,
    )
    info_text = open(raw_info, errors="replace").read()
    info_text = info_text.replace("\r\n", "\n").replace("\r", "\n")
    info_lines = sanitize(info_text).split("\n")
    # Remove empty leading/trailing lines from info
    while info_lines and not re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', info_lines[0]).strip():
        info_lines.pop(0)
    while info_lines and not re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', info_lines[-1]).strip():
        info_lines.pop()

    # Pad logo lines to a fixed width for side-by-side layout
    logo_width = max(len(re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', l)) for l in logo_lines) if logo_lines else 30
    padding = 4  # spaces between logo and info

    combined = []
    max_lines = max(len(logo_lines), len(info_lines))
    for i in range(max_lines):
        logo_part = logo_lines[i] if i < len(logo_lines) else ""
        info_part = info_lines[i] if i < len(info_lines) else ""
        # Calculate display width of logo line (strip ANSI for measurement)
        logo_display_width = len(re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', logo_part))
        # Pad to align
        pad_spaces = " " * (logo_width - logo_display_width + padding)
        combined.append(logo_part + pad_spaces + info_part)

    result = "\n".join(combined)
    open(san, "w").write(result)
    return san

def capture(label, cmd_args, cols=200):
    """Capture command output via script(1), sanitize, return path."""
    raw = TMP / f"raw-{label}.txt"
    san = TMP / f"san-{label}.txt"
    # Run command with wide terminal via env COLUMNS
    env = os.environ.copy()
    env["COLUMNS"] = str(cols)
    env["LINES"] = "60"
    subprocess.run(
        ["script", "-q", str(raw)] + list(cmd_args),
        env=env,
        timeout=60,
    )
    content = open(raw, errors="replace").read()
    content = content.replace("\r\n", "\n").replace("\r", "\n")
    # Keep ANSI codes, apply sanitization
    open(san, "w").write(sanitize(content))
    return san

def capture_lines(label, cmd_args, keep="middle", cols=200):
    """Capture output, strip first/last lines, sanitize, return path."""
    raw = TMP / f"raw-{label}.txt"
    san = TMP / f"san-{label}.txt"
    env = os.environ.copy()
    env["COLUMNS"] = str(cols)
    env["LINES"] = "60"
    subprocess.run(
        ["script", "-q", str(raw)] + list(cmd_args),
        env=env,
        timeout=60,
    )
    content = open(raw, errors="replace").read()
    content = content.replace("\r\n", "\n").replace("\r", "\n")
    lines = content.split("\n")
    if keep == "middle" and len(lines) >= 3:
        # Remove first line (control chars) and last line (reset/empty)
        content = "\n".join(lines[1:-1])
    elif keep == "middle" and len(lines) == 2:
        # Only 2 lines: remove first, keep second
        content = lines[1]
    open(san, "w").write(sanitize(content))
    return san

def crop_png(src, dst, crop_y, crop_h, w):
    """Crop a region of a PNG using PIL."""
    from PIL import Image
    img = Image.open(src)
    cropped = img.crop((0, crop_y, min(w, img.width), crop_y + crop_h))
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
# 1. fastfetch — side-by-side logo + info (4K)
# ============================================================
print("1/4  fastfetch")
sf = capture_fastfetch_side_by_side()
vhs("fastfetch", f"""Type "cls"
Enter
Sleep 0.5s
Type "cat {sf}"
Enter
Sleep 3s""", w=3840, h=2160, fs=24, shell="nu")
# Crop fastfetch to remove command input line at top
src = OUT / "fastfetch.png"
if src.exists():
    cropped = TMP / "fastfetch-cropped.png"
    crop_png(src, cropped, 30, 2000, 3690)
    subprocess.run(["mv", str(cropped), str(src)])

# ============================================================
# 2. starship — capture prompt, strip first/last lines (4K)
# ============================================================
print("2/4  starship")
sf = capture_lines("starship", ["starship", "prompt"], keep="middle")
vhs("starship", f"""Type "cls"
Enter
Sleep 0.5s
Type "cat {sf}"
Enter
Sleep 3s""", w=3840, h=2160, fs=24, shell="nu")
# Crop starship to just the prompt line (skip command input above)
src = OUT / "starship.png"
if src.exists():
    cropped = TMP / "starship-cropped.png"
    crop_png(src, cropped, 30, 35, 3690)
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
