# BlockScript Formatter - Release Guide

## 🚀 Simple Release Process (GitHub)

Keine komplizierte Token-Verwaltung - alles läuft über GitHub Releases!

### Wie man ein Release erstellt:

#### Schritt 1: Version aktualisieren
```bash
# Bearbeite package.json
# Ändere "version" z.B. von 0.2.0 zu 0.2.1
```

#### Schritt 2: Änderungen committen
```bash
git add .
git commit -m "v0.2.1: Update version"
git push origin main
```

#### Schritt 3: Tag erstellen & pushen
```bash
git tag v0.2.1
git push origin v0.2.1
```

**Fertig!** 🎉

GitHub Actions wird automatisch:
1. Code kompilieren
2. VSIX-Paket erstellen
3. Release mit Download-Link erstellen

---

## 📥 Installation für Benutzer

### Option 1: Von GitHub Release herunterladen
1. Gehe zu: https://github.com/steampilot/OpaccBlockScriptFormatter/releases
2. Download `.vsix` Datei
3. In VS Code: `Ctrl+Shift+P` → "Install from VSIX"
4. Datei auswählen → Fertig!

### Option 2: Aus Repository bauen
```bash
git clone https://github.com/steampilot/OpaccBlockScriptFormatter.git
cd OpaccBlockScriptFormatter
npm install
npm run compile
npm run package
code --install-extension *.vsix
```

---

## 📝 Release Notes Beispiel

Wenn du ein Release erstellst, kannst du Release Notes hinzufügen:

```
## v0.2.1 - BlockScript Formatter

### ✨ Features
- Automatic code formatting for BlockScript files
- Smart indentation and operator spacing
- Comment formatting

### 🐛 Bug Fixes
- Fixed indentation in nested blocks

### 📦 Installation
Download the `.vsix` file and install via VS Code:
`Ctrl+Shift+P` → "Install from VSIX"
```

---

## 🔗 Links

- **GitHub Releases**: https://github.com/steampilot/OpaccBlockScriptFormatter/releases
- **Repository**: https://github.com/steampilot/OpaccBlockScriptFormatter
- **VS Code Extension Installation**: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-vsix

