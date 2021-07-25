import { replaceDoubleDash } from "./emDash";
import { replaceSingleQuotes } from "./singleQuotes";
import { replaceSmartQuotes } from "./smartQuotes";
import { replaceSuspensionPoints } from "./suspensionPoints";

export default [
  replaceDoubleDash,
  replaceSingleQuotes,
  replaceSmartQuotes,
  replaceSuspensionPoints,
];
