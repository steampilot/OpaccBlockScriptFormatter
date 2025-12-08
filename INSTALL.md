# Installation & Integration in Opacc ToolChain

## System-Anforderungen

- **VS Code**: Version 1.80.0 oder höher
- **Node.js**: v20.17.0 oder höher (für Build)
- **npm**: v9.0.0 oder höher

## Schritt-für-Schritt Installation

### 1. Repository klonen

```bash
git clone https://git01-lab.opacc.ch/turm/blockscript-formatter.git
cd blockscript-formatter
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Extension bauen

```bash
npm run compile
```

Falls VSIX-Datei benötigt wird (für Verteilung):

```bash
npm run package
```

Dies erstellt `blockscript-formatter-0.1.0.vsix` im Projektverzeichnis.

### 4. Installation in VS Code

#### Option A: VSIX-Datei installieren (empfohlen für Distribution)

```bash
code --install-extension blockscript-formatter-0.1.0.vsix
```

#### Option B: Entwicklungs-Modus (lokal)

```bash
# Im blockscript-formatter Verzeichnis
npm run watch
```

Dann in VS Code: `F5` zum Starten des Extension Development Host.

### 5. Überprüfung

1. Öffne eine `.fbs` oder `.fbl` Datei in VS Code
2. Die Sprache sollte als "BlockScript" angezeigt werden
3. Formatiere mit `Shift+Alt+F`
4. Code sollte nach BlockScript-Regeln formatiert werden

## Integration in Opacc ToolChain

### Verteilung an Entwickler

1. **VSIX-Datei erstellen**:
   ```bash
   npm run package
   ```

2. **Datei bereitstellen** (z.B. in Opacc Software Repository):
   - `blockscript-formatter-0.1.0.vsix`

3. **Installation via Script** (optional):
   ```bash
   code --install-extension blockscript-formatter-0.1.0.vsix --force
   ```

### Workspace-spezifische Konfiguration

Für standardisierte Formatierungsregeln in der Opacc ToolChain (`.vscode/settings.json` im Workspace):

```json
{
  "[blockscript]": {
    "editor.defaultFormatter": "TURM.turm-blockscript-formatter",
    "editor.formatOnSave": true,
    "editor.rulers": [80, 100]
  }
}
```

## Updates & Wartung

### Update durchführen

```bash
cd blockscript-formatter
git pull origin main
npm install
npm run compile
npm run package
```

Neue VSIX-Datei erneut an Entwickler verteilen.

### Neue Formatter-Regeln hinzufügen

1. Änderungen in `src/formatter.ts` vornehmen
2. Kompilieren: `npm run compile`
3. Testen: F5 im Development Host
4. Package erstellen: `npm run package`

## Support & Problembehebung

### Extension wird nicht erkannt

- **Überprüfung**: File Explorer → BlockScript-Datei öffnen → Sprache sollte "BlockScript" sein
- **Lösung**: `npm run compile` neu ausführen und VS Code neu starten

### Formatierung funktioniert nicht

- `Shift+Alt+F` versuchen (Standard VS Code Format-Shortcut)
- VS Code Output anschauen: View → Output → "BlockScript Formatter Extension"
- Bei Bedarf Debug-Modus starten (F5 im Development Host)

### Performance-Issues

Falls Formatter langsam läuft:
- `src/formatter.ts` optimieren
- Tests mit großen Dateien durchführen
- Console-Logs hinzufügen für Profiling

## Kontakt & Entwicklung

- **Repository**: https://git01-lab.opacc.ch/turm/blockscript-formatter
- **Issue Tracking**: [Git Repository Issues]
- **Lead Developer**: TURM Team
