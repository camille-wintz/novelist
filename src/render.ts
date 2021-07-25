import * as vscode from "vscode";
import * as rawFs from "fs";
import * as path from "path";
import * as Bluebird from "bluebird";
import { exec } from "child_process";

const fs = Bluebird.promisifyAll(rawFs);

export const mergeFiles = async () => {
  if (!vscode.workspace.workspaceFolders) {
    return;
  }

  const extensionConfig = vscode.workspace.getConfiguration("novelist");
  const folder = path.join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    extensionConfig.get<string>("manuscriptFolder") || ""
  );

  if (!folder) {
    return;
  }

  const files = await fs.readdirAsync(folder, { withFileTypes: true });
  let output = "";
  for (let file of files) {
    if (path.extname(file.name) !== ".md") {
      continue;
    }
    const content = await fs.readFileAsync(path.join(folder, file.name));
    output += content;
  }

  let docContent = output.replace(/(< ([^>]+)<)/g, "").replace(/\s+/g, " ");
  docContent = docContent.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  vscode.window.showInformationMessage(
    "Generating manuscript (" + docContent.split(" ").length + " words)"
  );

  await fs.writeFileAsync(
    vscode.workspace.workspaceFolders[0].uri.fsPath + "/manuscript.md",
    output
  );
};

export const renderDoc = async () => {
  if (!vscode.workspace.workspaceFolders) {
    return;
  }

  mergeFiles();

  const extensionConfig = vscode.workspace.getConfiguration("novelist");
  const referencesFolder = path.join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    extensionConfig.get<string>("referencesFolder") || ""
  );

  const sourceFile = path.join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    "./manuscript.md"
  );

  const outputFile = path.join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    "./manuscript.docx"
  );

  exec(
    'pandoc --data-dir="' +
      referencesFolder +
      '" -s "' +
      sourceFile +
      '" -o "' +
      outputFile +
      '"',
    (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        vscode.window.showErrorMessage(`Error: ${stderr}`);
        return;
      }
      vscode.window.showInformationMessage("Manuscript converted to .docx");
    }
  );
};
