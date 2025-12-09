# Installation & Setup

## System Requirements

- **VS Code**: Version 1.80.0 or higher
- **Node.js**: v20.17.0 or higher (for build)
- **npm**: v9.0.0 or higher

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/steampilot/OpaccBlockScriptFormatter.git
cd blockscript-formatter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build Extension

```bash
npm run compile
```

If you need the VSIX file (for distribution):

```bash
npm run package
```

This creates `blockscript-formatter-0.1.0.vsix` in the project directory.

### 4. Install in VS Code

#### Option A: Install VSIX file (recommended for distribution)

```bash
code --install-extension blockscript-formatter-0.1.0.vsix
```

#### Option B: Development Mode (local)

```bash
# In blockscript-formatter directory
npm run watch
```

Then in VS Code: Press `F5` to start the Extension Development Host.

### 5. Verification

1. Open a `.fbs` or `.fbl` file in VS Code
2. Language should display as "BlockScript"
3. Format with `Shift+Alt+F`
4. Code should be formatted according to BlockScript rules

## Setup Configuration

### Workspace Configuration

For standardized formatting rules (`.vscode/settings.json` in your workspace):

```json
{
  "[blockscript]": {
    "editor.defaultFormatter": "steampilot.opacc-blockscript-formatter",
    "editor.formatOnSave": true,
    "editor.rulers": [80, 100]
  }
}
```

## Updates & Maintenance

### Perform Update

```bash
cd blockscript-formatter
git pull origin main
npm install
npm run compile
npm run package
```

Redistribute the new VSIX file to users.

### Add New Formatter Rules

1. Make changes in `src/formatter.ts`
2. Compile: `npm run compile`
3. Test: Press F5 in Development Host
4. Create package: `npm run package`

## Support & Troubleshooting

### Extension Not Recognized

- **Check**: File Explorer → Open BlockScript file → Language should show "BlockScript"
- **Solution**: Run `npm run compile` again and restart VS Code

### Formatting Not Working

- Try `Shift+Alt+F` (VS Code standard format shortcut)
- Check VS Code Output: View → Output → "BlockScript Formatter Extension"
- Start debug mode if needed (press F5 in Development Host)

### Performance Issues

If formatter runs slowly:
- Optimize `src/formatter.ts`
- Test with large files
- Add console logs for profiling

## Contact & Development

- **Repository**: https://github.com/steampilot/OpaccBlockScriptFormatter
- **Issue Tracking**: [GitHub Repository Issues]
- **Lead Developer**: steampilot
