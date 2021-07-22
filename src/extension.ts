// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let log = vscode.window.createOutputChannel("Novelist");
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  log.appendLine("Novelist mode activated on markdown file");

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    vscode.workspace.onDidChangeTextDocument((event) => {
      editor.selections.forEach((sel) => {
        if (!event.contentChanges.length) {
          return;
        }

        const { range } = event.contentChanges[0];
        const previousCharacter = new vscode.Range(
          range.start,
          new vscode.Position(range.start.line, range.start.character + 1)
        );
        let text = event.document.getText(previousCharacter);
        if (text.indexOf("'") === -1) {
          return;
        }

        editor.edit((editBuilder) => {
          editor.selections.forEach((sel) => {
            let curlyQuote = text.replace(/'/g, "’");
            log.appendLine(curlyQuote);
            editBuilder.replace(previousCharacter, curlyQuote);
          });
        });
      });
    });
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "novelist.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Novelist!");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
