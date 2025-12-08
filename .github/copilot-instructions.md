# BlockScript Formatter Extension - Copilot Instructions

## Projektübersicht
VS Code Extension für automatische Code-Formatierung von BlockScript-Dateien (.FBS/.FBL).
- **Language**: TypeScript
- **Type**: VS Code Formatter Extension
- **Package Manager**: npm
- **Trigger**: Ctrl+Alt+F oder Format Document

## BlockScript Syntax-Grundlagen
BlockScript ist TypeScript-ähnlich mit folgenden Besonderheiten:
- Klammern-Syntax wie TypeScript
- Indentation: 2 oder 4 Spaces (konsistent halten)
- Funktionen: `function name() : returnType { ... }`
- Services: `var result := BlockServices_GetBo(...)`
- XRES/XTAB/XARR/XFAS Datenstrukturen

## Formatierungs-Regeln

### Indentation
- Standard: 2 Spaces pro Level
- Keine Tabs
- Konsistente Einrückung in Funktionen, Schleifen, Bedingungen

### Spacing
- Um Operatoren: ` := `, ` = `, ` == `, ` <> `
- Nach Keywords: `if (`, `for (`, `while (`
- Vor öffnenden Klammern bei Funktionen: `function name()`
- Keine Spaces in leeren Klammern

### Leerzeilen
- Eine Leerzeile zwischen Funktionen
- Keine mehrfachen Leerzeilen hintereinander
- Leerzeile nach Imports/Using-Statements

### Kommentare
- `// Kommentare` mit Leerzeichen nach //
- Mehrzeilig: `/* ... */`
- German language preferred

## Development Setup
1. `npm install` - Dependencies installieren
2. `npm run compile` - TypeScript kompilieren
3. `npm test` - Tests ausführen
4. `npm run package` - VSIX-Package erstellen

## Extension-Struktur
- `src/extension.ts` - Hauptdatei, DocumentFormattingEditProvider
- `src/formatter.ts` - Formatter-Logik für BlockScript
- `package.json` - Extension-Manifest
- `.vscodeignore` - Exclude-Patterns für Package

## Git-Repository
- **Upstream**: git01-lab.opacc.ch/turm/blockscript-formatter
- **Branch**: main (Production) / develop (Development)
- **Commits**: Mit aussagekräftigen Nachrichten auf Deutsch

## KI-Agent Richtlinien
- Keine automatischen `git push` ohne Bestätigung
- Code-Änderungen mit Tests validieren
- BlockScript-Syntax beachten
- Deutsche Kommentare und Dokumentation verwenden
