import * as vscode from "vscode";
import { ReplaceParams } from "./ReplaceParams";

export const replaceSmartQuotes = ({ range, event, editor }: ReplaceParams) => {
  const previousCharacter = new vscode.Range(
    range.start,
    new vscode.Position(range.start.line, range.start.character + 1)
  );
  let text = event.document.getText(previousCharacter);
  if (text.indexOf('"') === -1) {
    return;
  }

  editor.edit((editBuilder) => {
    const previousTextRange = new vscode.Range(
      range.start,
      new vscode.Position(0, 0)
    );
    const previousText = event.document.getText(previousTextRange);
    let curlyQuote;

    if (previousText.lastIndexOf("“") > previousText.lastIndexOf("”")) {
      curlyQuote = text.replace(/"/g, "”");
    } else {
      curlyQuote = text.replace(/"/g, "“");
    }
    editBuilder.replace(previousCharacter, curlyQuote);
  });
};
