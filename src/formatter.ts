import * as vscode from 'vscode';

export class BlockScriptFormatter {
  /**
   * Formatiert BlockScript Code
   * @param code Der zu formatierende Code
   * @returns Der formatierte Code
   */
  public static format(code: string): string {
    let lines = code.split('\n');

    // Schritt 1: Entferne Trailing Whitespace
    lines = lines.map(line => line.trimEnd());

    // Schritt 2: Normalisiere Tabs zu Spaces (2 Spaces)
    lines = lines.map(line => this.normalizeTabs(line));

    // Schritt 3: Bereinige mehrfache Leerzeilen
    lines = this.cleanMultipleBlankLines(lines);

    // Schritt 4: Formatiere Spacing um Operatoren
    lines = lines.map(line => this.formatOperatorSpacing(line));

    // Schritt 5: Formatiere Keywords
    lines = lines.map(line => this.formatKeywordSpacing(line));

    // Schritt 6: Formatiere Kommentare
    lines = lines.map(line => this.formatComments(line));

    // Schritt 7: Manage Leerzeilen vor/nach Funktionen
    lines = this.manageFunctionSpacing(lines);

    // Schritt 8: Korrigiere Einrückung
    lines = lines.map((line, index) => this.fixIndentation(line, index, lines));

    return lines.join('\n');
  }

  /**
   * Konvertiert Tabs zu Spaces (2 Spaces pro Tab)
   */
  private static normalizeTabs(line: string): string {
    return line.replace(/\t/g, '  ');
  }

  /**
   * Bereinigt mehrfache Leerzeilen (maximal eine)
   */
  private static cleanMultipleBlankLines(lines: string[]): string[] {
    const result: string[] = [];
    let lastWasBlank = false;

    for (const line of lines) {
      const isBlank = line.trim() === '';

      if (!isBlank || !lastWasBlank) {
        result.push(line);
      }

      lastWasBlank = isBlank;
    }

    return result;
  }

  /**
   * Formatiert Spacing um Operatoren
   * := = == <> != < > <= >=
   */
  private static formatOperatorSpacing(line: string): string {
    // Ignoriere Kommentare
    const commentIndex = line.indexOf('//');
    const codepart = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const commentPart = commentIndex !== -1 ? line.substring(commentIndex) : '';

    let result = codepart;

    // Formatiere := (Assignment)
    result = result.replace(/\s*:=\s*/g, ' := ');

    // Formatiere = (nur wenn nicht ==, !=, <=, >=)
    result = result.replace(/([^=!<>])\s*=\s*(?!=)/g, '$1 = ');

    // Formatiere ==
    result = result.replace(/\s*==\s*/g, ' == ');

    // Formatiere <>
    result = result.replace(/\s*<>\s*/g, ' <> ');

    // Formatiere !=
    result = result.replace(/\s*!=\s*/g, ' != ');

    // Formatiere Vergleichsoperatoren
    result = result.replace(/\s*(<=|>=)\s*/g, ' $1 ');
    result = result.replace(/\s*(<|>)(?!=)/g, ' $1 ');

    // Entferne extra Spaces am Anfang
    result = result.trimStart();

    return result + commentPart;
  }

  /**
   * Formatiert Spacing nach Keywords
   */
  private static formatKeywordSpacing(line: string): string {
    const commentIndex = line.indexOf('//');
    const codepart = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const commentPart = commentIndex !== -1 ? line.substring(commentIndex) : '';

    let result = codepart;

    // Keywords mit öffnender Klammer sollten Space haben
    const keywords = ['if', 'for', 'while', 'switch', 'catch', 'function'];

    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\s*\\(`, 'g');
      result = result.replace(regex, `${keyword} (`);
    }

    return result + commentPart;
  }

  /**
   * Formatiert Kommentare: "// Text" statt "//Text"
   */
  private static formatComments(line: string): string {
    // Formatiere // Kommentare
    return line.replace(/\/\/\s*(\S)/g, '// $1');
  }

  /**
   * Managed Leerzeilen vor/nach Funktionsdefinitionen
   */
  private static manageFunctionSpacing(lines: string[]): string[] {
    const result: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      const prevLine = i > 0 ? lines[i - 1] : '';

      result.push(currentLine);

      // Wenn aktuelle Zeile eine Funktion startet und nächste nicht leer ist
      if (this.isFunctionDefinition(currentLine) && nextLine.trim() !== '' && i + 1 < lines.length) {
        // Nächste Leerzeile wird hinzugefügt, wenn nicht vorhanden
      }

      // Wenn aktuelle Zeile leer und nächste Funktion ist
      if (currentLine.trim() === '' && nextLine.trim() !== '' && this.isFunctionDefinition(nextLine)) {
        // Behalte eine Leerzeile
      }
    }

    return result;
  }

  /**
   * Checkt ob Zeile eine Funktionsdefinition ist
   */
  private static isFunctionDefinition(line: string): boolean {
    const trimmed = line.trim();
    return /^\s*function\s+\w+\s*\(/.test(trimmed);
  }

  /**
   * Korrigiert Einrückung basierend auf Klammern-Ebene
   */
  private static fixIndentation(line: string, index: number, lines: string[]): string {
    const trimmed = line.trim();

    // Leere Zeilen nicht einrücken
    if (trimmed === '') {
      return '';
    }

    // Berechne Einrückungs-Level basierend auf öffnenden/schließenden Klammern
    let indentLevel = this.calculateIndentLevel(index, lines);

    // Korrigiere für schließende Klammern am Anfang
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    return '  '.repeat(indentLevel) + trimmed;
  }

  /**
   * Berechnet Einrückungs-Level für eine Zeile
   */
  private static calculateIndentLevel(lineIndex: number, lines: string[]): number {
    let level = 0;

    for (let i = 0; i < lineIndex; i++) {
      const line = lines[i];
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      level += openBraces - closeBraces;
    }

    return Math.max(0, level);
  }
}

/**
 * DocumentFormattingEditProvider für BlockScript
 */
export class BlockScriptFormattingProvider implements vscode.DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {

    if (document.lineCount === 0) {
      return [];
    }

    const fullRange = new vscode.Range(
      document.lineAt(0).range.start,
      document.lineAt(document.lineCount - 1).range.end
    );

    const originalCode = document.getText(fullRange);
    const formattedCode = BlockScriptFormatter.format(originalCode);

    if (originalCode === formattedCode) {
      return [];
    }

    return [vscode.TextEdit.replace(fullRange, formattedCode)];
  }

  /**
   * Formatiert einen Bereich von Code
   */
  provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {

    const text = document.getText(range);
    const formattedText = BlockScriptFormatter.format(text);

    if (text === formattedText) {
      return [];
    }

    return [vscode.TextEdit.replace(range, formattedText)];
  }
}
