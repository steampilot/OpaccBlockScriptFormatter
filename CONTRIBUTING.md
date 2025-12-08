# Beitragen zur BlockScript Formatter Extension

## Entwicklungsrichtlinien

### Git Workflow

1. **Main Branch**: Productive Release Branch
2. **Dev Branch**: Development Branch (Standard)
3. **Feature Branches**: `feature/beschreibung`
4. **Bugfix Branches**: `bugfix/beschreibung`

### Commit-Nachrichtenformat

```
<type>: <beschreibung>

<optionale detaillierte Erklärung>

Fixes #<issue-number> (falls zutreffend)
```

**Types**:
- `feat`: Neue Funktionalität
- `fix`: Bugfix
- `docs`: Dokumentation
- `style`: Code-Stil (ohne Logik-Änderung)
- `refactor`: Code-Umstrukturierung
- `test`: Test-Hinzufügungen
- `chore`: Build/Dependencies/Tooling

### Beispiele

```bash
# Feature
git commit -m "feat: Unterstützung für XFAS-Strukturformatierung"

# Bugfix
git commit -m "fix: Falsche Indentierung bei verschachtelten Blöcken"

# Dokumentation
git commit -m "docs: Installation für Linux dokumentiert"
```

## Code-Stil

### TypeScript/JavaScript

- **2 Spaces** Indentation
- **Semicolons** nicht verwenden (BlockScript-Style)
- **console.log()** vor Release entfernen
- **Type annotations** verwenden wo möglich
- **English** für Code, **Deutsch** für Kommentare

### Formatter-Logik

Die Formatter-Regeln sind in `src/formatter.ts` definiert. Neue Regeln hinzufügen:

1. Neue Methode in `BlockScriptFormattingProvider` erstellen
2. In `format()` Methode aufrufen
3. Unit-Tests hinzufügen
4. Dokumentation in README aktualisieren

### Beispiel: Neue Formatierungs-Regel

```typescript
private formatNewRule(text: string): string {
  // Implementierung
  return text;
}

public format(text: string): string {
  // ... bestehende Regeln ...
  text = this.formatNewRule(text);
  // ... weitere Regeln ...
  return text;
}
```

## Testing

### Unit-Tests ausführen

```bash
npm test
```

### Test-Datei erstellen

Neue Test-Datei in `src/test/` mit `.test.ts` Suffix:

```typescript
import * as assert from 'assert';
import { BlockScriptFormattingProvider } from '../../formatter';

suite('BlockScript Formatter Tests', () => {
  let formatter: BlockScriptFormattingProvider;

  setup(() => {
    formatter = new BlockScriptFormattingProvider();
  });

  test('Should format := operator', () => {
    const input = 'var x:=5';
    const expected = 'var x := 5';
    const result = formatter.format(input);
    assert.strictEqual(result, expected);
  });
});
```

## Development Setup

### Debug-Session starten

```bash
npm run compile
# Dann F5 in VS Code drücken
```

### Watch-Modus (Auto-Recompile)

```bash
npm run watch
```

### ESLint-Check

```bash
npm run lint
```

## Neue Funktionalität hinzufügen

1. **Branch erstellen**: `git checkout -b feature/neue-feature`
2. **Implementieren**: Code schreiben + Tests
3. **Testen**: `npm test` und F5 Debug
4. **Commit**: `git commit -m "feat: Beschreibung"`
5. **Push**: `git push origin feature/neue-feature`
6. **Merge Request** erstellen auf dev-Branch

## Versionierung

Folge [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Inkompatible Änderungen
- **Minor** (0.X.0): Neue Features (abwärts-kompatibel)
- **Patch** (0.0.X): Bugfixes

Update in `package.json`:
```json
{
  "version": "0.2.0"
}
```

## Dokumentation aktualisieren

Bei neuen Features oder Änderungen:
- README.md aktualisieren
- INSTALL.md ergänzen (falls Installationsschritte ändern)
- Code-Kommentare hinzufügen
- Git-Commit mit `docs:` Prefix

## Performance & Debugging

### Formatter optimieren

Für große Dateien >10000 Zeilen:

```typescript
// Regex pre-compile
private commentPattern = /\/\/.*$/gm;

private formatComments(text: string): string {
  return text.replace(this.commentPattern, ...);
}
```

### Debug-Ausgabe

```typescript
console.log('DEBUG: Input length:', text.length);
console.log('DEBUG: After indentation:', text);
```

## Support

- **Issues**: Im Git-Repository erstellen
- **Questions**: Kontakt mit TURM Team
- **Ideas**: Feature-Requests willkommen!

## Lizenz

Siehe LICENSE Datei.
