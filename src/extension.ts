import * as vscode from 'vscode';
import { BlockScriptFormattingProvider } from './formatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('BlockScript Formatter Extension is now active!');

  // Registriere den DocumentFormattingEditProvider für BlockScript
  const formatter = new BlockScriptFormattingProvider();

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: 'blockscript', scheme: 'file' },
      formatter
    )
  );

  // Registriere RangeFormattingEditProvider für Selections
  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { language: 'blockscript', scheme: 'file' },
      formatter
    )
  );

  // Registriere Command für manuelles Formatieren
  let formatCommand = vscode.commands.registerCommand('blockscript-formatter.format', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    if (editor.document.languageId !== 'blockscript') {
      vscode.window.showWarningMessage('This file is not a BlockScript file');
      return;
    }

    await vscode.commands.executeCommand('editor.action.formatDocument');
    vscode.window.showInformationMessage('BlockScript code formatted successfully!');
  });

  context.subscriptions.push(formatCommand);
}

export function deactivate() {
  console.log('BlockScript Formatter Extension is now deactivated');
}
