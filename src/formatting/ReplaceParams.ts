import * as vscode from "vscode";

export interface ReplaceParams {
  range: vscode.Range;
  event: vscode.TextDocumentChangeEvent;
  editor: vscode.TextEditor;
}
