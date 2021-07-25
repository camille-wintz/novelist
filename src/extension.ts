// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { mergeFiles, renderDoc } from "./render";
import formatting from "./formatting";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let log = vscode.window.createOutputChannel("Novelist");
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Novelist mode activated on markdown file");

  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor || editor.document.languageId !== "markdown") {
      return;
    }

    const document = editor.document;
    editor.selections.forEach((sel) => {
      if (!event.contentChanges.length) {
        return;
      }

      const { range } = event.contentChanges[0];

      formatting.forEach((f) => {
        f({ range, event, editor });
      });
    });
  });

  const merge = vscode.commands.registerCommand("novelist.merge", () => {
    mergeFiles();
  });

  const render = vscode.commands.registerCommand("novelist.render", () => {
    renderDoc();
  });

  context.subscriptions.push(render);
  context.subscriptions.push(merge);
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("Deactivating Novelist");
}
