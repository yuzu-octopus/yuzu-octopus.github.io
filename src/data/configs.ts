export type ConfigLanguage = 'json' | 'jsonc' | 'toml' | 'ini' | 'yaml' | 'sh' | 'nu';

export interface Config {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  sourceUrl: string;
  code: string;
  language: ConfigLanguage;
}

export const configs: Config[] = [
  {
    id: 'fastfetch',
    name: 'Fastfetch',
    description: 'System info display with custom Dracula theming and categorized modules',
    screenshot: '/screenshots/fastfetch.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/fastfetch/config.jsonc',
    language: 'json',
    code: `{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/master/doc/json_schema.json",
  "logo": {
    "type": "auto",
    "padding": {
      "top": 3,
      "left": 0,
      "right": 4,
    },
    "printRemaining": true,
    "preserveAspectRatio": true,
    "recache": false,
    "position": "left",
    "color": {
      "1": "#BD93F9",
      "2": "#BD93F9",
      "3": "#BD93F9",
      "4": "#BD93F9",
      "6": "#BD93F9",
      "5": "#BD93F9",
    },
  },
  "display": {
    "disableLinewrap": true,
    "hideCursor": true,
    "separator": " ",
    "brightColor": true,
    "duration": {
      "abbreviation": false,
      "spaceBeforeUnit": "default",
    },
    "size": {
      "maxPrefix": "YB",
      "binaryPrefix": "iec",
      "ndigits": 2,
      "spaceBeforeUnit": "default",
    },
    "temp": {
      "unit": "D",
      "ndigits": 1,
      "color": {
        "green": "32",
        "yellow": "80",
        "red": "90",
      },
      "spaceBeforeUnit": "default",
    },
    "percent": {
      "type": ["num", "num-color"],
      "ndigits": 1,
      "color": {
        "green": 50,
        "yellow": 75,
        "red": 90,
      },
      "spaceBeforeUnit": "default",
      "width": 0,
    },
    "bar": {
      "char": {
        "elapsed": "\u25a0",
        "total": "-",
      },
      "border": {
        "left": "[ ",
        "right": " ]",
        "leftElapsed": "",
        "rightElapsed": "",
      },
      "color": {
        "elapsed": "auto",
        "total": "97",
        "border": "97",
      },
      "width": 10,
    },
    "fraction": {
      "ndigits": 2,
    },
    "noBuffer": false,
    "freq": {
      "ndigits": 2,
      "spaceBeforeUnit": "default",
    },
    "constants": [],
  },
  "general": {
    "thread": true,
    "processingTimeout": 500,
    "detectVersion": true,
  },
  "modules": [
    {
      "type": "title",
      "key": " ",
      "fqdn": false,
      "color": {
        "user": "#F1FA8C",
        "at": "#F1FA8C",
        "host": "#F1FA8C",
      },
    },
    "break",
    // OS and Environment
    {
      "type": "custom",
      "key": "\uf053",
      "format": "System",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
    },
    {
      "type": "host",
      "key": "\u2523\uf0a2",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{name~22, 24} {name~0, 11} {name~13, 15}",
    },
    {
      "type": "os",
      "key": "\u2523\uf302",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{name} {codename} {version}",
    },
    {
      "type": "kernel",
      "key": "\u2523\uf0e3",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
    },
    {
      "type": "uptime",
      "key": "\u2514\ue801",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{days}d {hours}h {minutes}m",
    },
    "break",
    // Hardware
    {
      "type": "custom",
      "key": "\uf0a2",
      "format": "Hardware",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "cpu",
      "key": "\u2523\uf4bc",
      "showPeCoreCount": true,
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{name} ({core-types}) @ {freq-max}",
    },
    {
      "type": "gpu",
      "key": "\u2523\uf0ae",
      "driverSpecific": true,
      "detectionMethod": "auto",
      "hideType": "none",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{name} ({core-count}) @ {frequency}",
    },
    {
      "type": "memory",
      "key": "\u2523\uefc5",
      "percent": {
        "green": 50,
        "yellow": 80,
        "type": 0,
      },
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{used} / {total} ({percentage})",
    },
    {
      "type": "swap",
      "percent": {
        "green": 50,
        "yellow": 80,
        "type": 0,
      },
      "key": "\u2523\uf0e1",
      "separate": false,
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "disk",
      "key": "\u2523\uf0a0",
      "percent": {
        "green": 50,
        "yellow": 80,
        "type": 0,
      },
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{size-used} / {size-total} ({size-percentage})",
    },
    {
      "type": "display",
      "key": "\u2523\uf0b9",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{width}x{height} ({refresh-rate} Hz, {ppi} ppi)",
    },
    {
      "type": "poweradapter",
      "key": "\u2523\uf0e5",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "battery",
      "key": "\u2514\uf0c9",
      "percent": {
        "green": 50,
        "yellow": 20,
        "type": 0,
      },
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{capacity} ({?12}{time-hours}h {time-minutes}m left{?}{/12}{status}{/}) {cycle-count} \uf021",
    },
    "break",
    // Terminal
    {
      "type": "custom",
      "key": "\uf0be",
      "format": "Terminal",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "shell",
      "key": "\u2523\uf0c9",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
      "format": "{exe-name} {version}",
    },
    {
      "type": "terminal",
      "key": "\u2523\ue795",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "de",
      "key": "\u2523\ue23c",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "theme",
      "key": "\u2514\uf0e6",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    "break",
    // Development
    {
      "type": "custom",
      "key": "\uf0c9",
      "format": "Development",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2523\uf0a2",
      "text": "git --version | cut -d' ' -f3",
      "format": "git {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2523\ue79e",
      "text": "bun --version",
      "format": "bun {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2523\uf0b7",
      "text": "java --version | head -n1 | cut -d' ' -f2",
      "format": "java {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2523\uec29",
      "text": "uv --version | cut -d' ' -f2",
      "format": "uv {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2523\uf0a0",
      "text": "python3 --version | cut -d' ' -f2",
      "format": "python {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "\u2514\uf3b7",
      "text": "docker --version | cut -d' ' -f3 | cut -d',' -f1",
      "format": "docker {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    "break",
    // Network
    {
      "type": "command",
      "key": "\uf0bd",
      "text": "(route -n get default 2>/dev/null | grep -q interface || system_profiler SPBluetoothDataType 2>/dev/null | grep -q 'Connected: Yes') && echo 'Network' || echo 'Disconnected'",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "bluetooth",
      "key": "\u2523\uf094",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "command",
      "key": "\u2523\uf0a9",
      "text": "$HOME/.config/fastfetch/fastfetch-wifi",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "command",
      "key": "\u2523\uf0a9f",
      "text": "dig +short myip.opendns.com @resolver1.opendns.com 2>/dev/null",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "localip",
      "key": "\u2514\uf6c2",
      "showIpv4": true,
      "showPrefixLen": true,
      "defaultRouteOnly": true,
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
      "format": "{ipv4}",
    },
    "break",
  ],
}`,
  },
  {
    id: 'starship',
    name: 'Starship',
    description: 'Cross-shell prompt with Dracula palette and directory substitutions',
    screenshot: '/screenshots/starship.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/starship.toml',
    language: 'toml',
    code: `"$schema" = 'https://starship.rs/config-schema.json'

format = """
\\n\\
$cmd_duration\\
[\u2396](comment)\\
$username\\
[\ue0b0](bg:purple fg:comment)\\
$directory\\
[\ue0b0](bg:orange fg:purple)\\
$git_branch$git_status\\
[\ue0b0](bg:cyan fg:orange)\\
$nodejs\\
$bun\\
$python\\
$golang\\
$rust\\
$c\\
$cpp\\
$java\\
$lua\\
$ruby\\
$swift\\
[\ue0b0](bg:pink fg:cyan)\\
$time\\
[\ue0b0 ](fg:pink)"""

palette = 'dracula'
add_newline = false

[username]
show_always = true
style_user = "bg:comment fg:foreground"
style_root = "bg:comment fg:foreground"
format = '[$user ]($style)'

[directory]
style = "bg:purple fg:foreground"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "\u2026/"
home_symbol = "\uf0b5"

[directory.substitutions]
"Desktop" = "\uf088"
"Documents" = "\uf099"
"Downloads" = "\uf019"
"Music" = "\uf01a"
"Pictures" = "\uf0be"
"Videos" = "\uf0bd"
"Developer" = "\uf0b2"
"Dev" = "\uf0b2"
"Projects" = "\uf0d7"
"Code" = "\uf021"
"src" = "\uf021"
"Library" = "\ueedc"
"Applications" = "\uf0d6"
"Public" = "\uf0ac"
"Work" = "\uf0db"
"School" = "\uf19d"
"Config" = "\ue615"
".config" = "\ue615"
"dotfiles" = "\ue615"
"tmp" = "\uf0d4"
"Trash" = "\uf0ba"
"Games" = "\uf0db"
"Books" = "\uf0bf"
"Fonts" = "\uf031"
"Scripts" = "\uf0c9"
"node_modules" = "\uf0d9"
"venv" = "\uf6ea"
".venv" = "\uf6ea"
"git" = "\uf0d3"
".git" = "\uf0d3"
"GitHub" = "\uf0d3"
"iCloud" = "\uf085"

[git_branch]
symbol = "\uf0d8"
style = "bg:orange"
format = '[[ $symbol $branch ](fg:foreground bg:orange)]($style)'

[git_status]
style = "bg:orange"
format = '[[($all_status$ahead_behind$stashed )](fg:foreground bg:orange)]($style)'

[nodejs]
symbol = "\ue71c"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'
detect_files = ["package.json", "package-lock.json", "bun.lock", "node_modules"]

[bun]
symbol = "\ue76f"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[python]
symbol = "\ue606"
style = "bg:cyan"
format = '[[ $symbol( $version)( \\($virtualenv\\)) ](fg:foreground bg:cyan)]($style)'

[golang]
symbol = "\ue627"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[rust]
symbol = "\ue7a8"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[c]
symbol = "\ue61e "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[cpp]
symbol = "\ue61d "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[java]
symbol = "\ue256 "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[lua]
symbol = "\ue620"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[ruby]
symbol = "\ue23e"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[swift]
symbol = "\ue75d"
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:pink"
format = '[[ $time ](fg:foreground bg:pink)]($style)'

[line_break]
disabled = true

[character]
disabled = true

[cmd_duration]
show_milliseconds = true
format = "\ueb74 in $duration\\n"
style = "bold fg:comment"
disabled = false
show_notifications = true
min_time_to_notify = 45000

[palettes.dracula]
foreground = "#F8F8F2"
pink = "#ff79c6"
red = "#ff5555"
yellow = "#f1fa8c"
green = "#50fa7b"
blue = "#644ac9"
purple = "#bd93f9"
cyan = "#8be9fd"
orange = "#ffb86c"
comment = "#6272a4"`,
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    description: 'GPU-accelerated terminal with Dracula theme, transparency, and Nerd Font',
    screenshot: '/screenshots/ghostty.gif',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/ghostty/config',
    language: 'ini',
    code: `#command = /opt/homebrew/bin/nu
#command = /bin/zsh
theme = Dracula
window-theme = auto
font-family = "JetBrainsMono Nerd Font Mono"
font-size = 15
background-opacity = 0.6
background-blur-radius = 20
window-padding-x = 15
window-padding-y = 15
cursor-style = bar
cursor-click-to-move = true
macos-option-as-alt = true`,
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    description: 'AI coding assistant with plugin ecosystem and MCP server integrations',
    screenshot: '/screenshots/opencode.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/opencode/opencode.jsonc',
    language: 'json',
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "opencode-skills-collection@latest",
    "opencode-agent-skills",
    "opencode-agent-memory",
    "superpowers@git+https://github.com/obra/superpowers.git"
  ],
  "mcp": {
    "github": {
      "type": "remote",
      "url": "https://api.githubcopilot.com/mcp/",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Authorization": "<REDACTED>"
      }
    },
    "playwright": {
      "type": "local",
      "command": ["bunx", "@playwright/mcp@latest"],
      "enabled": true
    },
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true
    },
    "sequential-thinking": {
      "type": "local",
      "command": ["bunx", "@modelcontextprotocol/server-sequential-thinking"],
      "enabled": true
    },
    "memory-bank": {
      "type": "local",
      "command": ["bunx", "@allpepper/memory-bank-mcp@latest"],
      "env": {
        "MEMORY_BANK_ROOT": "/Users/yuzu/.opencode/memory-bank"
      },
      "enabled": true
    },
    "sagemath": {
      "type": "local",
      "command": ["docker", "run", "--rm", "-i", "ghcr.io/xbp-europe/sagemath-mcp:latest"],
      "enabled": true
    },
    "python-repl": {
      "type": "local",
      "command": ["uvx", "mcp-py-repl"],
      "enabled": true
    }
  }
}`,
  },
  {
    id: 'nushell-env',
    name: 'Nushell Environment',
    description: `Nushell's environment configuration: editor, PATH, color settings, and LS_COLORS via vivid Dracula`,
    screenshot: '/screenshots/nushell-env.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/nushell/env.nu',
    language: 'nu',
    code: `$env.EDITOR = "micro"
$env.MICRO_TRUECOLOR = "1"
$env.CLICOLOR = "1"
$env.COLORTERM = "truecolor"
$env.BUN_INSTALL = ($env.HOME | path join ".bun")
$env.OPENCODE_ENABLE_EXA = "1"

$env.PATH = ($env.PATH | split row (char esep) | prepend [
    "/opt/homebrew/bin"
    "/opt/homebrew/sbin"
    ($env.HOME | path join ".bun" "bin")
    ($env.HOME | path join ".lmstudio" "bin")
    ($env.HOME | path join ".spicetify")
    ($env.HOME | path join ".orbstack" "bin")
    ($env.HOME | path join ".local" "bin")
] | uniq | path expand)

$env.LS_COLORS = (vivid generate dracula)`,
  },
  {
    id: 'nushell-config',
    name: 'Nushell Config',
    description: 'Shell aliases, configuration flags, history settings, fuzzy completions, and starship prompt integration',
    screenshot: '/screenshots/nushell-config.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/nushell/config.nu',
    language: 'nu',
    code: `alias cls = clear
alias edit = micro
alias nano = micro
alias py = python3
alias quit = exit
alias run = code_runner

$env.config = ($env.config
| upsert show_banner false
| upsert edit_mode emacs
| upsert buffer_editor "micro"
| upsert rm { always_trash: true }
| upsert history {
    file_format: sqlite
    max_size: 5_000_000
    sync_on_enter: true
    isolation: true
}
| upsert completions {
    case_sensitive: false
    algorithm: "fuzzy"
    partial: true
    quick: true
})

if ($env.TERM_PROGRAM != "zed") {
    clear
    ^fastfetch
}

starship init nu | save -f ($nu.data-dir | path join "vendor/autoload/starship.nu")`,
  },
  {
    id: 'code-runner',
    name: 'Code Runner',
    description: 'Polyglot file runner with Dracula-themed output — detects file extensions and runs with the appropriate interpreter (Python, JS/TS, Go, Rust, C/C++, Java, Shell, Nushell, Ruby, Perl, Lua, Swift)',
    screenshot: '/screenshots/code-runner.gif',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/scripts/code_runner.zsh',
    language: 'sh',
    code: `#!/usr/bin/env zsh
#
# code_runner.zsh — A polyglot file runner with Dracula-themed output.
#
# Detects the file extension and runs it with the appropriate interpreter.
# Supports Python, JavaScript/TypeScript, Go, Rust, C/C++, Java, Shell,
# Nushell, Ruby, Perl, Lua, and Swift.
#
# Usage:
#   code_runner <file> [-- <args>...]
#   code_runner --list
#   code_runner --version
#
# Installation:
#   sudo cp code_runner.zsh /usr/local/bin/code_runner
#   sudo chmod +x /usr/local/bin/code_runner
#
# Designed for use with Zed, but works from any terminal.
#

VERSION="2.0.0"

# ── High-Resolution Timing ──────────────────────────────────────────────────
zmodload zsh/datetime

# ── Dracula Color Palette ───────────────────────────────────────────────────
# https://github.com/dracula/dracula-theme
PURPLE='\\033[38;2;189;147;249m'
PINK='\\033[38;2;255;121;198m'
RED='\\033[38;2;255;85;85m'
GREEN='\\033[38;2;80;250;123m'
COMMENT='\\033[38;2;98;114;164m'
FG='\\033[38;2;248;248;242m'
BOLD='\\033[1m'
RESET='\\033[0m'

# ── NO_COLOR Support ────────────────────────────────────────────────────────
# Disable colors when NO_COLOR is set or stdout is not a terminal.
if [[ -n "$NO_COLOR" ]] || [[ ! -t 1 ]]; then
    PURPLE=""
    PINK=""
    RED=""
    GREEN=""
    COMMENT=""
    FG=""
    BOLD=""
    RESET=""
fi

# ── Output Helpers ──────────────────────────────────────────────────────────
SEP_LEN=$(tput cols 2>/dev/null || echo 80)
SEP=$(printf '%*s' "$SEP_LEN" '' | tr ' ' '─')

# Print the run header with a purple ▶ play icon and full-width separator.
print_header() {
    printf "\${PURPLE}\${BOLD}▶\${RESET} \${BOLD}\${FG}%s\${RESET}\\n" "$1"
    printf "\${COMMENT}\${SEP}\${RESET}\\n"
}

# Print the run footer with status icon, duration, and color-coded exit code.
print_footer() {
    local duration="$1" exit_code="$2" icon exit_color
    if [[ "$exit_code" -eq 0 ]]; then
        icon="\${PURPLE}\${BOLD}✓\${RESET}"
        exit_color="\${GREEN}"
    else
        icon="\${RED}\${BOLD}✗\${RESET}"
        exit_color="\${RED}"
    fi
    printf "\${COMMENT}\${SEP}\${RESET}\\n"
    printf "\${icon} \${BOLD}\${FG}Finished in \${PINK}%s\${RESET} \${FG}(exit: \${exit_color}%s\${RESET}\${FG})\${RESET}\\n" \\
        "$duration" "$exit_code"
}

# Print an error message to stderr with a red ✗ icon.
print_error() {
    printf "\${RED}\${BOLD}✗\${RESET} \${RED}%s\${RESET}\\n" "$1" >&2
}

# Format duration with smart unit selection (ns → µs → ms → s → min → hr).
format_time() {
    local t=$1
    if (( t < 0.000001 )); then
        printf "%.2f ns" $(( t * 1000000000 ))
    elif (( t < 0.001 )); then
        printf "%.2f µs" $(( t * 1000000 ))
    elif (( t < 1 )); then
        printf "%.2f ms" $(( t * 1000 ))
    elif (( t < 60 )); then
        printf "%.2f s" $t
    elif (( t < 3600 )); then
        printf "%d min %d s" $(( t / 60 )) $(( t % 60 ))
    else
        printf "%d hr %d min" $(( t / 3600 )) $(( (t % 3600) / 60 ))
    fi
}

# ── Signal Forwarding ───────────────────────────────────────────────────────
# Forward signals to the child process so Ctrl-C works cleanly.
CHILD_PID=""
forward_signal() {
    local sig="$1"
    [[ -n "$CHILD_PID" ]] && kill -"$sig" "$CHILD_PID" 2>/dev/null
}
trap 'forward_signal INT' INT
trap 'forward_signal TERM' TERM

# ── Run a command with signal tracking ──────────────────────────────────────
run_with_tracking() {
    "$@" &
    CHILD_PID=$!
    wait "$CHILD_PID"
    CHILD_PID=""
    return $?
}

# ── Cleanup compiled binaries ───────────────────────────────────────────────
cleanup_bin() {
    [[ -n "\${1:-}" ]] && [[ -f "$1" ]] && rm -- "$1"
}

# ── CLI Flags ───────────────────────────────────────────────────────────────
case "\${1:-}" in
    --version|-v)
        echo "code_runner $VERSION"
        exit 0
        ;;
    --list|-l)
        echo "Supported extensions:"
        echo "  Python:       py"
        echo "  JavaScript:   js, ts, jsx, tsx"
        echo "  Go:           go"
        echo "  Rust:         rs"
        echo "  C/C++:        c, cpp, cc, cxx"
        echo "  Java:         java"
        echo "  Shell:        sh, zsh"
        echo "  Nushell:      nu"
        echo "  Ruby:         rb"
        echo "  Perl:         pl, pm"
        echo "  Lua:          lua"
        echo "  Swift:        swift"
        exit 0
        ;;
esac

# ── Argument Handling ───────────────────────────────────────────────────────
# Zed passes arguments unquoted; rejoin them into a single path.
# Support pass-through args after --: code_runner script.py -- arg1 arg2
FILE_PATH="\${(j: :)@}"
PASS_ARGS=()

# Check for -- separator and extract pass-through arguments.
if [[ "$FILE_PATH" == *"--"* ]]; then
    # Re-parse original args to split on --
    local_args=("$@")
    FILE_PATH=""
    PASS_ARGS=()
    in_pass_args=false
    for arg in "\${local_args[@]}"; do
        if [[ "$arg" == "--" ]]; then
            in_pass_args=true
            continue
        fi
        if $in_pass_args; then
            PASS_ARGS+=("$arg")
        else
            if [[ -z "$FILE_PATH" ]]; then
                FILE_PATH="$arg"
            else
                FILE_PATH="$FILE_PATH $arg"
            fi
        fi
    done
fi

if [[ -z "$FILE_PATH" ]]; then
    echo "Usage: code_runner <file> [-- <args>...]"
    echo ""
    echo "Runs a file with the appropriate interpreter based on its extension."
    echo ""
    echo "Options:"
    echo "  --list, -l       Show supported extensions"
    echo "  --version, -v    Show version"
    echo ""
    echo "Supported extensions:"
    echo "  Python:    py"
    echo "  JavaScript: js, ts, jsx, tsx"
    echo "  Go:        go"
    echo "  Rust:      rs"
    echo "  C/C++:     c, cpp, cc, cxx"
    echo "  Java:      java"
    echo "  Shell:     sh, zsh"
    echo "  Nushell:   nu"
    echo "  Ruby:      rb"
    echo "  Perl:      pl, pm"
    echo "  Lua:       lua"
    echo "  Swift:     swift"
    exit 1
fi

if [[ ! -f "$FILE_PATH" ]]; then
    print_error "File '$FILE_PATH' not found."
    exit 1
fi

# ── File Metadata ───────────────────────────────────────────────────────────
EXT="\${FILE_PATH##*.}"
FILENAME=$(basename -- "$FILE_PATH")
DIR_PATH=$(dirname -- "$FILE_PATH")

# Show relative path from $HOME for cleaner output; fall back to filename.
REL_PATH="\${FILE_PATH#$HOME/}"
[[ "$REL_PATH" == "$FILE_PATH" ]] && REL_PATH="$FILENAME"

# ── Timing Start ────────────────────────────────────────────────────────────
start_time=$EPOCHREALTIME

# ── Execution Logic ─────────────────────────────────────────────────────────
case "$EXT" in
    # ── Python ──────────────────────────────────────────────────────────────
    py)
        if command -v uv >/dev/null; then
            print_header "uv run $REL_PATH"
            uv run -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        else
            print_header "python3 $REL_PATH"
            python3 -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        fi
        ;;

    # ── JavaScript / TypeScript ─────────────────────────────────────────────
    js|ts|jsx|tsx)
        if command -v bun >/dev/null; then
            print_header "bun run $REL_PATH"
            bun run -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        else
            print_header "node $REL_PATH"
            node -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        fi
        ;;

    # ── Go ──────────────────────────────────────────────────────────────────
    go)
        print_header "go run $REL_PATH"
        go run "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Rust ────────────────────────────────────────────────────────────────
    rs)
        if [[ -f "$DIR_PATH/Cargo.toml" ]]; then
            print_header "cargo run"
            cargo run --quiet --manifest-path "$DIR_PATH/Cargo.toml" -- "\${PASS_ARGS[@]}"
        else
            local BIN_NAME="\${FILE_PATH%.*}"
            local TRAP_CMD="cleanup_bin '$BIN_NAME'"
            # Chain with any existing EXIT trap
            local existing_trap
            existing_trap=$(trap -p EXIT 2>/dev/null | sed "s/trap -- '//;s/' EXIT$//")
            [[ -n "$existing_trap" ]] && TRAP_CMD="$existing_trap; $TRAP_CMD"
            trap "$TRAP_CMD" EXIT

            print_header "rustc $REL_PATH && ./$FILENAME:r"
            rustc "$FILE_PATH" -o "$BIN_NAME" && run_with_tracking "$BIN_NAME" "\${PASS_ARGS[@]}"
        fi
        ;;

    # ── C / C++ ─────────────────────────────────────────────────────────────
    cpp|cc|cxx|c)
        local compiler="g++"; [[ "$EXT" == "c" ]] && compiler="gcc"
        local BIN_NAME="\${FILE_PATH%.*}"
        local TRAP_CMD="cleanup_bin '$BIN_NAME'"
        local existing_trap
        existing_trap=$(trap -p EXIT 2>/dev/null | sed "s/trap -- '//;s/' EXIT$//")
        [[ -n "$existing_trap" ]] && TRAP_CMD="$existing_trap; $TRAP_CMD"
        trap "$TRAP_CMD" EXIT

        print_header "$compiler $REL_PATH && ./$FILENAME:r"
        $compiler "$FILE_PATH" -o "$BIN_NAME" && run_with_tracking "$BIN_NAME" "\${PASS_ARGS[@]}"
        ;;

    # ── Java ────────────────────────────────────────────────────────────────
    java)
        print_header "java $REL_PATH"
        java "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Shell ───────────────────────────────────────────────────────────────
    sh|zsh)
        print_header "zsh $REL_PATH"
        zsh -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Nushell ─────────────────────────────────────────────────────────────
    nu)
        print_header "nu $REL_PATH"
        nu -- "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Ruby ────────────────────────────────────────────────────────────────
    rb)
        print_header "ruby $REL_PATH"
        ruby "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Perl ────────────────────────────────────────────────────────────────
    pl|pm)
        print_header "perl $REL_PATH"
        perl "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Lua ─────────────────────────────────────────────────────────────────
    lua)
        print_header "lua $REL_PATH"
        lua "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Swift ───────────────────────────────────────────────────────────────
    swift)
        print_header "swift $REL_PATH"
        swift "$FILE_PATH" "\${PASS_ARGS[@]}"
        ;;

    # ── Unknown ─────────────────────────────────────────────────────────────
    *)
        print_error "No runner configured for .$EXT files."
        exit 1
        ;;
esac

# ── Timing End ──────────────────────────────────────────────────────────────
exit_code=$?
end_time=$EPOCHREALTIME

# Calculate duration in seconds (floating point).
duration=$(( end_time - start_time ))

# ── Done ────────────────────────────────────────────────────────────────────
print_footer "$(format_time $duration)" "$exit_code"
exit $exit_code`,
  },
];
