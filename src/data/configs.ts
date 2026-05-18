export interface Config {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  sourceUrl: string;
  code: string;
  language: string;
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
        "elapsed": "■",
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
      "key": "",
      "format": "System",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
    },
    {
      "type": "host",
      "key": "├󰌢",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{name~22, 24} {name~0, 11} {name~13, 15}",
    },
    {
      "type": "os",
      "key": "├",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{name} {codename} {version}",
    },
    {
      "type": "kernel",
      "key": "├",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
    },
    {
      "type": "uptime",
      "key": "└",
      "keyColor": "#aef0fe",
      "outputColor": "#8BE9FD",
      "format": "{days}d {hours}h {minutes}m",
    },
    "break",
    // Hardware
    {
      "type": "custom",
      "key": "󰌢",
      "format": "Hardware",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "cpu",
      "key": "├",
      "showPeCoreCount": true,
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{name} ({core-types}) @ {freq-max}",
    },
    {
      "type": "gpu",
      "key": "├󰢮",
      "driverSpecific": true,
      "detectionMethod": "auto",
      "hideType": "none",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{name} ({core-count}) @ {frequency}",
    },
    {
      "type": "memory",
      "key": "├",
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
      "key": "├󰓡",
      "separate": false,
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "disk",
      "key": "├",
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
      "key": "├󰍹",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{width}x{height} ({refresh-rate} Hz, {ppi} ppi)",
    },
    {
      "type": "poweradapter",
      "key": "├󱐥",
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
    },
    {
      "type": "battery",
      "key": "└",
      "percent": {
        "green": 50,
        "yellow": 20,
        "type": 0,
      },
      "keyColor": "#84fba3",
      "outputColor": "#50FA7B",
      "format": "{capacity} ({?12}{time-hours}h {time-minutes}m left{?}{/12}{status}{/}) {cycle-count} ",
    },
    "break",
    // Terminal
    {
      "type": "custom",
      "key": "󰞷",
      "format": "Terminal",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "shell",
      "key": "├",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
      "format": "{exe-name} {version}",
    },
    {
      "type": "terminal",
      "key": "├",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "de",
      "key": "├",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    {
      "type": "theme",
      "key": "└󰉦",
      "keyColor": "#ffcd98",
      "outputColor": "#FFB86C",
    },
    "break",
    // Development
    {
      "type": "custom",
      "key": "",
      "format": "Development",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "├󰊢",
      "text": "git --version | cut -d' ' -f3",
      "format": "git {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "├",
      "text": "bun --version",
      "format": "bun {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "├󰬷",
      "text": "java --version | head -n1 | cut -d' ' -f2",
      "format": "java {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "├",
      "text": "uv --version | cut -d' ' -f2",
      "format": "uv {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "├󰌠",
      "text": "python3 --version | cut -d' ' -f2",
      "format": "python {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    {
      "type": "command",
      "key": "└",
      "text": "docker --version | cut -d' ' -f3 | cut -d',' -f1",
      "format": "docker {result}",
      "keyColor": "#ff8888",
      "outputColor": "#FF5555",
    },
    "break",
    // Network
    {
      "type": "command",
      "key": "󰴽",
      "text": "(route -n get default 2>/dev/null | grep -q interface || system_profiler SPBluetoothDataType 2>/dev/null | grep -q 'Connected: Yes') && echo 'Network' || echo 'Disconnected'",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "bluetooth",
      "key": "├",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "command",
      "key": "├󰖩",
      "text": "$HOME/.config/fastfetch/fastfetch-wifi",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "command",
      "key": "├󰩟",
      "text": "dig +short myip.opendns.com @resolver1.opendns.com 2>/dev/null",
      "format": "{result}",
      "keyColor": "#ffa1d7",
      "outputColor": "#FF79C6",
    },
    {
      "type": "localip",
      "key": "└󱦂",
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
[](comment)\\
$username\\
[](bg:purple fg:comment)\\
$directory\\
[](bg:orange fg:purple)\\
$git_branch$git_status\\
[](bg:cyan fg:orange)\\
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
[](bg:pink fg:cyan)\\
$time\\
[ ](fg:pink)"""

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
truncation_symbol = "…/"
home_symbol = "󰀵"

[directory.substitutions]
"Desktop" = ""
"Documents" = "󰈙"
"Downloads" = ""
"Music" = "󰝚"
"Pictures" = ""
"Videos" = ""
"Developer" = "󰲋"
"Dev" = "󰲋"
"Projects" = "󰏗"
"Code" = ""
"src" = ""
"Library" = ""
"Applications" = "󰏖"
"Public" = ""
"Work" = "󰏛"
"School" = ""
"Config" = ""
".config" = ""
"dotfiles" = ""
"tmp" = "󰔐"
"Trash" = "󰏺"
"Games" = ""
"Books" = "󰂿"
"Fonts" = ""
"Scripts" = ""
"node_modules" = "󰎙"
"venv" = "󱧪"
".venv" = "󱧪"
"git" = ""
".git" = ""
"GitHub" = ""
"iCloud" = "󰂅"

[git_branch]
symbol = ""
style = "bg:orange"
format = '[[ $symbol $branch ](fg:foreground bg:orange)]($style)'

[git_status]
style = "bg:orange"
format = '[[($all_status$ahead_behind$stashed )](fg:foreground bg:orange)]($style)'

[nodejs]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'
detect_files = ["package.json", "package-lock.json", "bun.lock", "node_modules"]

[bun]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[python]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version)( \\($virtualenv\\)) ](fg:foreground bg:cyan)]($style)'

[golang]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[rust]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[c]
symbol = " "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[cpp]
symbol = " "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[java]
symbol = " "
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[lua]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[ruby]
symbol = ""
style = "bg:cyan"
format = '[[ $symbol( $version) ](fg:foreground bg:cyan)]($style)'

[swift]
symbol = ""
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
format = " in $duration\\n"
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
    screenshot: '/screenshots/ghostty.png',
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
];
