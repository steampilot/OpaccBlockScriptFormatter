# BlockScript Formatter Extension

Automatischer Code-Formatter für BlockScript-Dateien (.FBS/.FBL) in VS Code.

## Features

- 🎨 **Automatische Formatierung** via `Ctrl+Alt+F` oder "Format Document"
- 📏 **Intelligente Einrückung** (2 oder 4 Spaces, konsistent)
- ✨ **Spacing um Operatoren** (`:=`, `=`, `==`, `<>`, etc.)
- 🔤 **Konsistente Kommentar-Formatierung**
- 📋 **Leerzeilen-Management** (zwischen Funktionen, nach Imports)
- 🧩 **BlockScript-Syntax Support** (XRES, XTAB, XARR, XFAS)

## Installation

1. Extension aus dem VS Code Marketplace installieren oder lokal bauen
2. Shortcut `Ctrl+Alt+F` zum Formatieren verwenden

## Development

### Setup
```bash
npm install
npm run compile
```

### Development Mode
```bash
npm run watch
```

### Testen
```bash
npm test
```

### Package erstellen
```bash
npm run package
```

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

# Zu develop pushen und MR erstellen
git push origin feature/neue-funktion
```

## Repository

- **URL**: git01-lab.opacc.ch/turm/blockscript-formatter
- **Main Branch**: main
- **Development Branch**: develop
