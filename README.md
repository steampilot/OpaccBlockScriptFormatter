# BlockScript Formatter Extension

![BlockScript Formatter Hero](media/hero-banner.png)

Automatic code formatter for BlockScript files (.FBS/.FBL) in VS Code.

A VS Code extension for automatic formatting of BlockScript code with consistent indentation, operator spacing, and comment formatting.

**🔗 Repository**: https://github.com/steampilot/OpaccBlockScriptFormatter
**🛠️ Developer**: steampilot

## Features

- 🎨 **Automatic Formatting** via `Shift+Alt+F` (VS Code Standard)
- 📏 **Smart Indentation** (2 Spaces, consistent)
- ✨ **Operator Spacing** (`:=`, `=`, `==`, `<>`, etc.)
- 🔤 **Consistent Comment Formatting** (`//` with space)
- 📋 **Blank Line Management** (between functions, no duplicate blank lines)
- 🧩 **BlockScript Syntax Support** (XRES, XTAB, XARR, XFAS)
- 📝 **TextMate Grammar** for syntax highlighting

## Before & After

### Before Formatting
```blockscript
function calculateTotal():number{
var sum:=0
for(var i:=0;i<items.length;i:=i+1){
sum:=sum+items[i]
}
return sum
}
```

### After Formatting
```blockscript
function calculateTotal() : number {
  var sum := 0
  for (var i := 0; i < items.length; i := i + 1) {
    sum := sum + items[i]
  }
  return sum
}
```

## Installation

### Option 1: Clone repository and build
```bash
git clone https://github.com/steampilot/OpaccBlockScriptFormatter.git
cd blockscript-formatter
npm install
npm run compile
npm run package
```

This creates a `.vsix` file for distribution.

### Option 2: Install as development extension
```bash
code --install-extension blockscript-formatter.vsix
```

### Option 3: Place in VS Code extensions directory
```
Windows: %USERPROFILE%\.vscode\extensions\
Linux: ~/.vscode/extensions/
macOS: ~/.vscode/extensions/
```

## Usage

Open a BlockScript file (`.fbs` or `.fbl`) and press:
- **Shift+Alt+F** to format the entire document
- **Shift+Alt+F** with selection to format only the selected text

## Project Structure

```
├── src/
│   ├── extension.ts       # Main entry point
│   ├── formatter.ts       # Formatter logic
│   └── test/
├── .vscode/
│   ├── settings.json      # Extension settings
│   ├── launch.json        # Debug configuration
│   └── tasks.json         # Build tasks
├── package.json
└── README.md
```

## Formatting Rules

### Indentation
- Standard: 2 spaces per level
- Consistent in functions, loops, conditionals
- No tabs

### Spacing
- Around operators: ` := `, ` = `, ` == `, ` <> `
- After keywords: `if (`, `for (`, `while (`
- No spaces in empty parentheses

### Comments
- `// Comment` with space after `//`
- Multi-line: `/* ... */`
- Language: English

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: Description of change"

# Push and create pull request
git push origin feature/new-feature
```

## Repository

- **URL**: https://github.com/steampilot/OpaccBlockScriptFormatter
- **Main Branch**: main (Release)
- **Development Branch**: dev (Aktive Entwicklung)
