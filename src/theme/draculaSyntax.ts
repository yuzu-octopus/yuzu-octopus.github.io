import type { CSSProperties } from 'react';

/**
 * Official Dracula color palette for syntax highlighting.
 * Based on the spec: https://draculatheme.com/spec
 */
export const draculaColors = {
  background: '#282a36',
  currentLine: '#44475a',
  foreground: '#f8f8f2',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};

/**
 * Custom Dracula syntax theme for react-syntax-highlighter (Prism).
 * Follows the official Dracula spec token-to-color mapping:
 *   https://draculatheme.com/spec
 *
 * Token map (from spec):
 *   Keywords & storage    → Pink     #FF79C6
 *   Functions & methods   → Green    #50FA7B
 *   Classes & types       → Cyan     #8BE9FD
 *   Strings & text        → Yellow   #F1FA8C
 *   Numbers & constants   → Orange   #FFB86C
 *   Comments              → Comment  #6272A4
 *   Variables             → Foreground #F8F8F2
 *   Operators/braces      → Foreground #F8F8F2
 *   Instance reserved     → Purple   #BD93F9 (italic)
 *   Regex                 → Cyan     #8BE9FD
 *   Deleted (diff)        → Red      #FF5555
 *   Inserted (diff)       → Green    #50FA7B
 */
export const draculaSyntaxTheme: Record<string, CSSProperties> = {
  // === Base styles ===
  'code[class*="language-"]': {
    color: draculaColors.foreground,
    background: 'none',
    fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: 4,
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: draculaColors.foreground,
    background: draculaColors.background,
    fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: 4,
    hyphens: 'none',
    padding: '1em',
    margin: '0',
    overflow: 'auto',
    borderRadius: '0',
  },
  ':not(pre) > code[class*="language-"]': {
    background: draculaColors.background,
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal',
  },

  // === Comments — #6272A4 ===
  comment: { color: draculaColors.comment },
  prolog: { color: draculaColors.comment },
  doctype: { color: draculaColors.comment },
  cdata: { color: draculaColors.comment },

  // === Punctuation & structure — Foreground ===
  punctuation: { color: draculaColors.foreground },
  namespace: { opacity: '0.7' },

  // === Keywords & storage — Pink #FF79C6 (spec: "Keywords, storage types") ===
  keyword: { color: draculaColors.pink },

  // === Strings, text content, attr values — Yellow #F1FA8C (spec: "Strings, text content") ===
  string: { color: draculaColors.yellow },
  char: { color: draculaColors.yellow },
  'attr-value': { color: draculaColors.yellow },

  // === Built-in functions & properties — Cyan (spec: "Support and Built-ins → Cyan") ===
  builtin: { color: draculaColors.cyan },

  // === Functions & methods — Green #50FA7B (spec: "Functions, methods") ===
  function: { color: draculaColors.green },

  // === Classes, types, support — Cyan #8BE9FD (spec: "Classes, types, support") ===
  'class-name': { color: draculaColors.cyan },
  'maybe-class-name': { color: draculaColors.cyan },
  property: { color: draculaColors.cyan },

  // === Numbers, booleans, constants — Orange #FFB86C (spec: "Numbers, constants, booleans") ===
  number: { color: draculaColors.orange },
  boolean: { color: draculaColors.orange },
  constant: { color: draculaColors.orange },
  symbol: { color: draculaColors.orange },

  // === Variables, identifiers, parameters — Foreground #F8F8F2 (spec: "Variables, identifiers") ===
  variable: { color: draculaColors.foreground },
  parameter: { color: draculaColors.foreground },

  // === Operators — Foreground (spec: "Braces & parentheses match scope foreground") ===
  operator: { color: draculaColors.foreground },

  // === Tags (HTML/XML) — Pink ===
  tag: { color: draculaColors.pink },

  // === Selectors & attributes ===
  selector: { color: draculaColors.green },
  'attr-name': { color: draculaColors.yellow },

  // === At-rules — Pink (keyword-adjacent) ===
  atrule: { color: draculaColors.pink },

  // === Regex — Cyan #8BE9FD (spec: "Regex") ===
  regex: { color: draculaColors.cyan },
  important: { color: draculaColors.cyan, fontWeight: 'bold' },

  // === Diff markers ===
  inserted: { color: draculaColors.green },
  deleted: { color: draculaColors.red },
  changed: { color: draculaColors.orange, fontStyle: 'italic' },

  // === URLs & entities ===
  entity: { color: draculaColors.foreground, cursor: 'help' },
  url: { color: draculaColors.foreground },

  // === CSS-specific overrides ===
  '.language-css .token.string': { color: draculaColors.foreground },
  '.style .token.string': { color: draculaColors.foreground },

  // === Text formatting ===
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },

  // === Escape sequences (Python \n, JS \\, TS template) ===
  escape: { color: draculaColors.pink },

  // === Template strings (JS/TS backticks) — Yellow ===
  'template-string': { color: draculaColors.yellow },
  'template-punctuation': { color: draculaColors.yellow },

  // === Interpolation (JS/TS ${}) ===
  interpolation: { color: draculaColors.foreground },

  // === Instance reserved words (this, self, super) — Purple italic ===
  'keyword.this': { color: draculaColors.purple, fontStyle: 'italic' },
  'keyword.self': { color: draculaColors.purple, fontStyle: 'italic' },
  'keyword.super': { color: draculaColors.purple, fontStyle: 'italic' },
};
