# Contributing to BlockScript Formatter Extension

## Development Guidelines

### Git Workflow

1. **Main Branch**: Productive Release Branch
2. **Develop Branch**: Development Branch (Standard)
3. **Feature Branches**: `feature/description`
4. **Bugfix Branches**: `bugfix/description`

### Commit Message Format

```
<type>: <description>

<optional detailed explanation>

Fixes #<issue-number> (if applicable)
```

**Types**:
- `feat`: New functionality
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code restructuring
- `test`: Test additions
- `chore`: Build/Dependencies/Tooling

### Examples

```bash
# Feature
git commit -m "feat: Add support for XFAS structure formatting"

# Bugfix
git commit -m "fix: Incorrect indentation in nested blocks"

# Documentation
git commit -m "docs: Document Linux installation"
```

## Code Style

### TypeScript/JavaScript

- **2 Spaces** Indentation
- **No Semicolons** (BlockScript Style)
- **Remove console.log()** before release
- **Use type annotations** where possible
- **English** for code, **English** for comments

### Formatter Logic

Formatter rules are defined in `src/formatter.ts`. To add new rules:

1. Create new method in `BlockScriptFormattingProvider`
2. Call it in `format()` method
3. Add unit tests
4. Update documentation in README

### Example: New Formatting Rule

```typescript
private formatNewRule(text: string): string {
  // Implementation
  return text;
}

public format(text: string): string {
  // ... existing rules ...
  text = this.formatNewRule(text);
  // ... further rules ...
  return text;
}
```

## Testing

### Run Unit Tests

```bash
npm test
```

### Create Test File

New test file in `src/test/` with `.test.ts` suffix:

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

### Start Debug Session

```bash
npm run compile
# Then press F5 in VS Code
```

### Watch Mode (Auto-Recompile)

```bash
npm run watch
```

### ESLint Check

```bash
npm run lint
```

## Adding New Features

1. **Create branch**: `git checkout -b feature/new-feature`
2. **Implement**: Write code + tests
3. **Test**: `npm test` and F5 debug
4. **Commit**: `git commit -m "feat: Description"`
5. **Push**: `git push origin feature/new-feature`
6. **Create Pull Request** to develop branch

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Incompatible changes
- **Minor** (0.X.0): New features (backwards compatible)
- **Patch** (0.0.X): Bug fixes

Update in `package.json`:
```json
{
  "version": "0.2.0"
}
```

## Update Documentation

For new features or changes:
- Update README.md
- Add to INSTALL.md (if installation steps change)
- Add code comments
- Commit with `docs:` prefix

## Performance & Debugging

### Optimize Formatter

For large files >10000 lines:

```typescript
// Pre-compile regex
private commentPattern = /\/\/.*$/gm;

private formatComments(text: string): string {
  return text.replace(this.commentPattern, ...);
}
```

### Debug Output

```typescript
console.log('DEBUG: Input length:', text.length);
console.log('DEBUG: After indentation:', text);
```

## Support

- **Issues**: Create in Git repository
- **Questions**: Contact with development team
- **Ideas**: Feature requests welcome!

## License

See LICENSE file.
