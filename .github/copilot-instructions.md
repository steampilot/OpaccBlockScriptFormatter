# BlockScript Formatter Extension - Copilot Instructions

## Project Overview
VS Code Extension for automatic code formatting of BlockScript files (.FBS/.FBL).
- **Language**: TypeScript
- **Type**: VS Code Formatter Extension
- **Package Manager**: npm
- **Trigger**: Ctrl+Alt+F or Format Document

## BlockScript Syntax Basics
BlockScript is TypeScript-like with the following special features:
- Bracket syntax like TypeScript
- Indentation: 2 or 4 spaces (keep consistent)
- Functions: `function name() : returnType { ... }`
- Services: `var result := BlockServices_GetBo(...)`
- XRES/XTAB/XARR/XFAS data structures

## Formatting Rules

### Indentation
- Standard: 2 spaces per level
- No tabs
- Consistent indentation in functions, loops, conditionals

### Spacing
- Around operators: ` := `, ` = `, ` == `, ` <> `
- After keywords: `if (`, `for (`, `while (`
- Before opening brackets in functions: `function name()`
- No spaces in empty brackets

### Blank Lines
- One blank line between functions
- No multiple blank lines in a row
- Blank line after imports/using statements

### Comments
- `// Comments` with space after //
- Multi-line: `/* ... */`
- English language preferred

## Development Setup
1. `npm install` - Install dependencies
2. `npm run compile` - Compile TypeScript
3. `npm test` - Run tests
4. `npm run package` - Create VSIX package

## Extension Structure
- `src/extension.ts` - Main file, DocumentFormattingEditProvider
- `src/formatter.ts` - Formatter logic for BlockScript
- `package.json` - Extension manifest
- `.vscodeignore` - Exclude patterns for package

## Git Repository
- **Repository**: https://github.com/steampilot/OpaccBlockScriptFormatter
- **Branch**: main (Production) / develop (Development)
- **Commits**: Use meaningful messages in English

## AI Agent Guidelines
- No automatic `git push` without confirmation
- Validate code changes with tests
- Follow BlockScript syntax rules
- Use English for comments and documentation
- **IMPORTANT: Research, don't guess** - Use get_vscode_api, fetch_webpage and other tools for research instead of speculating
- **VS Code language-configuration.json Schema**: Requires `"lineComment": { "comment": "//" }` (object format, not string) - This may differ from the official schema
- Always check the source/documentation before making changes
