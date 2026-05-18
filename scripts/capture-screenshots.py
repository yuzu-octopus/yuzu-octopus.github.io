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
    text = re.sub(r'Yuzus-MacBook-Air', 'Macbook-Air', text)
    text = re.sub(r"yuzu'?s? MacBook Air", "Wifi", text)
    text = IP_RE.sub(_ip_replacer, text)
    text = re.sub(r'\w[\w\'\-]+\s*[-–]\s*802\.11\w*', r'Wifi - 802.11', text)
    return text.strip()

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
    idx = content.find("\x1b[")
    if idx > 0:
        content = content[idx:]
    open(san, "w").write(sanitize(content))
    return san

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
vhs("fastfetch", f"""Type "cat {sf}"
Enter
Sleep 3s""", w=3840, h=2160, fs=24, shell="nu")

# ============================================================
# 2. starship — load prompt, cls, capture (4K)
# ============================================================
print("2/4  starship")
# Generate starship init file for nushell
subprocess.run(["starship", "init", "nu"], stdout=open(TMP / "starship.nu", "w"))
vhs("starship", f"""Type "source {TMP / 'starship.nu'}"
Enter
Sleep 1s
Type "cls"
Enter
Sleep 2s""", w=3840, h=2160, fs=24, shell="nu")

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
