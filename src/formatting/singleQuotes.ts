import * as vscode from "vscode";
import { ReplaceParams } from "./ReplaceParams";

export const replaceSingleQuotes = ({
  range,
  event,
  editor,
}: ReplaceParams) => {
  const previousCharacter = new vscode.Range(
    range.start,
    new vscode.Position(range.start.line, range.start.character + 1)
  );
  let text = event.document.getText(previousCharacter);
  if (text.indexOf("'") === -1) {
    return;
  }

  editor.edit((editBuilder) => {
    let curlyQuote = text.replace(/'/g, "’");
    editBuilder.replace(previousCharacter, curlyQuote);
  });
};
