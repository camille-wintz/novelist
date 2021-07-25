# Novelist

Provides tools for writers who have decided to use vscode. Works with Markdown files.

## Features

### Formatting

* Replaces regular quotes with smart quotes  
* Replaces single quotes with curly quotes  
* Replaces three dots (...) with ellipsis (…)
* Replaces two dashes (--) with em dash (—)

### Generate manuscript

\!\[Generate manuscript\]\(screens/commands.png\)

* Merge chapters: merge all chapters from any folder into a single file  
* Generate .docx file: you need to have pandoc installed for this feature to work

## Requirements

You need Pandoc to generate .docx files. The rest of the features will work without it.

## Extension Settings

* `novelist.manuscriptFolder`: the folder containing all your chapters. Will default to ./Manuscript
* `novelist.referencesFolder`: the folder containing your .docx reference file. Will default to ./References

## Known Issues

Commands only work from a markdown file

## Release Notes

### 1.0.0

Initial release
