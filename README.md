# Opacc BlockScript Formatter Extension

Automatischer Code-Formatter für BlockScript-Dateien (.FBS/.FBL) in VS Code.

Eine VS Code Extension zur automatischen Formatierung von Opacc BlockScript Code mit konsistenten Einrückungen, Operator-Spacing und Kommentar-Formatierung.

**🔗 Repository**: https://github.com/steampilot/OpaccBlockScriptFormatter
**🛠️ Entwickler**: steampilot

## Features

- 🎨 **Automatische Formatierung** via `Shift+Alt+F` (VS Code Standard)
- 📏 **Intelligente Einrückung** (2 Spaces, konsistent)
- ✨ **Spacing um Operatoren** (`:=`, `=`, `==`, `<>`, etc.)
- 🔤 **Konsistente Kommentar-Formatierung** (`//` mit Space)
- 📋 **Leerzeilen-Management** (zwischen Funktionen, keine doppelten Leerzeilen)
- 🧩 **BlockScript-Syntax Support** (XRES, XTAB, XARR, XFAS)
- 📝 **TextMate Grammar** für Syntax-Highlighting

## Installation für Sysop

### Option 1: Aus Repository klonen und bauen
```bash
git clone https://git01-lab.opacc.ch/turm/blockscript-formatter.git
cd blockscript-formatter
npm install
npm run compile
npm run package
```

Das erstellt eine `.vsix`-Datei für die Distribution.

### Option 2: Direkt als Entwicklungs-Extension installieren
```bash
code --install-extension blockscript-formatter.vsix
```

### Option 3: In VS Code Extensions-Verzeichnis platzieren
```
Windows: %USERPROFILE%\.vscode\extensions\
Linux: ~/.vscode/extensions/
macOS: ~/.vscode/extensions/
```

## Verwendung

## Verwendung

Öffne eine BlockScript-Datei (`.fbs` oder `.fbl`) und drücke:
- **Shift+Alt+F** zum Formatieren des gesamten Dokuments
- **Shift+Alt+F** mit Selektion zum Formatieren nur des ausgewählten Bereichs

## Projektstruktur

```
├── src/
│   ├── extension.ts       # Haupteinstiegspunkt
│   ├── formatter.ts       # Formatter-Logik
│   └── test/
├── .vscode/
│   ├── settings.json      # Extension-Einstellungen
│   ├── launch.json        # Debug-Konfiguration
│   └── tasks.json         # Build-Tasks
├── package.json
└── README.md
```

## Formatierungs-Regeln

### Indentation
- Standard: 2 Spaces pro Level
- Konsistent in Funktionen, Schleifen, Bedingungen
- Keine Tabs

### Spacing
- Um Operatoren: ` := `, ` = `, ` == `, ` <> `
- Nach Keywords: `if (`, `for (`, `while (`
- Keine Spaces in leeren Klammern

### Kommentare
- `// Kommentar` mit Leerzeichen nach `//`
- Mehrzeilig: `/* ... */`
- Bevorzugte Sprache: Deutsch

## Git Workflow

```bash
# Feature-Branch erstellen
git checkout -b feature/neue-funktion

# Änderungen committen
git add .
git commit -m "feat: Beschreibung der Änderung"

# Zu dev pushen und PR erstellen
git push origin feature/neue-funktion
```

## Repository

- **URL**: https://github.com/steampilot/OpaccBlockScriptFormatter
- **Main Branch**: main (Release)
- **Development Branch**: dev (Aktive Entwicklung)
