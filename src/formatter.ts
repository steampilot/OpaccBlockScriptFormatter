import * as vscode from 'vscode';

export class BlockScriptFormatter {
  /**
   * Formats BlockScript code
   * @param code The code to format
   * @returns The formatted code
   */
  public static format(code: string): string {
    let lines = code.split('\n');

    // Step 1: Remove trailing whitespace
    lines = lines.map(line => line.trimEnd());

    // Step 2: Normalize tabs to spaces (2 spaces)
    lines = lines.map(line => this.normalizeTabs(line));

    // Step 3: Clean multiple blank lines
    lines = this.cleanMultipleBlankLines(lines);

    // Step 4: Format spacing around operators
    lines = lines.map(line => this.formatOperatorSpacing(line));

    // Step 5: Format keywords
    lines = lines.map(line => this.formatKeywordSpacing(line));

    // Step 6: Format comments
    lines = lines.map(line => this.formatComments(line));

    // Step 7: Manage blank lines before/after functions
    lines = this.manageFunctionSpacing(lines);

    // Step 8: Fix indentation
    lines = lines.map((line, index) => this.fixIndentation(line, index, lines));

    return lines.join('\n');
  }

  /**
   * Converts tabs to spaces (2 spaces per tab)
   */
  private static normalizeTabs(line: string): string {
    return line.replace(/\t/g, '  ');
  }

  /**
   * Cleans multiple blank lines (maximum one)
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
   * Formats spacing around operators
   * := = == <> != < > <= >=
   */
  private static formatOperatorSpacing(line: string): string {
    // Ignore comments
    const commentIndex = line.indexOf('//');
    const codepart = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const commentPart = commentIndex !== -1 ? line.substring(commentIndex) : '';

    let result = codepart;

    // Format := (assignment)
    result = result.replace(/\s*:=\s*/g, ' := ');

    // Format = (only if not ==, !=, <=, >=)
    result = result.replace(/([^=!<>])\s*=\s*(?!=)/g, '$1 = ');

    // Format ==
    result = result.replace(/\s*==\s*/g, ' == ');

    // Format <>
    result = result.replace(/\s*<>\s*/g, ' <> ');

    // Format !=
    result = result.replace(/\s*!=\s*/g, ' != ');

    // Format comparison operators
    result = result.replace(/\s*(<=|>=)\s*/g, ' $1 ');
    result = result.replace(/\s*(<|>)(?!=)/g, ' $1 ');

    // Remove extra spaces at the beginning
    result = result.trimStart();

    return result + commentPart;
  }

  /**
   * Formats spacing after keywords
   */
  private static formatKeywordSpacing(line: string): string {
    const commentIndex = line.indexOf('//');
    const codepart = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const commentPart = commentIndex !== -1 ? line.substring(commentIndex) : '';

    let result = codepart;

    // Keywords with opening parenthesis should have space
    const keywords = ['if', 'for', 'while', 'switch', 'catch', 'function'];

    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\s*\\(`, 'g');
      result = result.replace(regex, `${keyword} (`);
    }

    return result + commentPart;
  }

  /**
   * Formats comments: "// Text" instead of "//Text"
   */
  private static formatComments(line: string): string {
    // Formatiere // Kommentare
    return line.replace(/\/\/\s*(\S)/g, '// $1');
  }

  /**
   * Manages blank lines before/after function definitions
   */
  private static manageFunctionSpacing(lines: string[]): string[] {
    const result: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      const prevLine = i > 0 ? lines[i - 1] : '';

      result.push(currentLine);

      // If current line starts function and next is not empty
      if (this.isFunctionDefinition(currentLine) && nextLine.trim() !== '' && i + 1 < lines.length) {
        // Add blank line if not present
      }

      // If current line is empty and next is function
      if (currentLine.trim() === '' && nextLine.trim() !== '' && this.isFunctionDefinition(nextLine)) {
        // Keep blank line
      }
    }

    return result;
  }

  /**
   * Checks if line is a function definition
   */
  private static isFunctionDefinition(line: string): boolean {
    const trimmed = line.trim();
    return /^\s*function\s+\w+\s*\(/.test(trimmed);
  }

  /**
   * Fixes indentation based on bracket depth
   */
  private static fixIndentation(line: string, index: number, lines: string[]): string {
    const trimmed = line.trim();

    // Don't indent empty lines
    if (trimmed === '') {
      return '';
    }

    // Calculate indentation level based on opening/closing brackets
    let indentLevel = this.calculateIndentLevel(index, lines);

    // Correct for closing brackets at the beginning
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    return '  '.repeat(indentLevel) + trimmed;
  }

  /**
   * Calculates indentation level for a line
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
 * DocumentFormattingEditProvider for BlockScript
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
   * Formats a range of code
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
