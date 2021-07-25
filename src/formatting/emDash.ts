import * as vscode from "vscode";
import { ReplaceParams } from "./ReplaceParams";

export const replaceDoubleDash = ({ range, event, editor }: ReplaceParams) => {
  const previousCharacter = new vscode.Range(
    new vscode.Position(range.start.line, range.start.character - 1),
    new vscode.Position(range.start.line, range.start.character + 1)
  );
  let text = event.document.getText(previousCharacter);

  if (text !== "--") {
    return;
  }

  editor.edit((editBuilder) => {
    let dashes = text.replace(/--/g, "—");
    editBuilder.replace(previousCharacter, dashes);
  });
};
