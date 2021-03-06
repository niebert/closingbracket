# Closing Bracket Search
Find in a string a closing bracket for an opening bracket. The search function will start from a specific start index in the string, identifies the start index of the next corresponding opening bracket and finds the corresponding closing bracket provided as parameter. The search function return a object withe the start index, the index of opening bracket and the index of the closing bracket.


## Example Closing Brackets
In general the syntactic structure of languages must respect the nested bracket structure. This means that opening a bracket with `(` refers not to the next closing bracket found in the string. This can be visualized with an arithmetic expression `(a-(b+c)+d)+e`. The opening bracket `(` before the `a` is **not closed** with the first closing bracket behind the `c`. The corresponding bracket **is closed** behind variable `d`. This library helps you in identification of the proper closing bracket for different brackets `(),{},[],<>`.


## Allowed Brackets
The bracket handler allows the following closing brackets:
* `)` with corresponding opening bracket `(`
* `}` with corresponding opening bracket `{`
* `]` with corresponding opening bracket `[`
* `<` with corresponding opening bracket `>`


## Demo of BracketHandler
The library `closingbracket.js` is imported in WebApp of type [AppLSAC-1](https://en.wikiversity.org/wiki/AppLSAC/Types). Marco definitions in LaTeX have to match opening and closing brackets for parameter counts `[3]` and parameters wrapped in brackets `{}`. With the demo you can play around with bracket definitions in LaTeX.
* **<a href="https://niebert.github.io/closingbracket" target="demo">Demo BracketHandler` for LaTeX NewCommands</a>**
* This tool was created for the [Wikiversity learning resource about LaTeX](https://en.wikiversity.org/wiki/LaTeX#Use_Latex_Source_in_Wikiversity)


## With Browser
Use a script tag and import the library `closingbracket.js` with:
```html
<script src="js/closingbracket.js"></script>
```
The script tag assumes that the library was stored in the subdirectory `js/` of your web project.

## With NodeJS
```shell
npm install closingbracket --save
```
Use a script tag and import the library `closingbracket.js` with:
```javascript
const BracketHandler = require('closingbracket');
```

## Use BracketHandler
With the import of the script/package you have a bracket handler `BracketHandler` available that provides the functionality for handling corresponding opening and closing brackets.

```javascript
var str = "MyCheck(char,(iasd+2),add(3,4),x); another_call(x,(y+20),(84*4))";
var vResult = BracketHandler.find_closing_bracket(str,")",2);
```
The function above start search for the closing bracket `)` beginning from index 2 (i.e. the `C` of `MyCheck...`). It finds the corresponding opening bracket `(` at position 7. and the closing bracket `)` at position 32 (i.e. the `)` after the `add(3,4),x`). The function `find_closing_bracket()` returns a JSON of the following structure:
```json
vResult = {
  "start_search": 2,
  "openbracket_at": 7,
  "closebracket_at": 32
};
```

## BracketHandler for LaTeX
The BracketHandler is able to replace the definition of macros in LaTeX. As an example the `\newcommand` definitions in LaTeX are used. In general LaTeX syntax is used for mathematical expressions in a thesis or for repeating text fragments with parameters.

### Use-Case
Assume you want to use the following text fragments
* Title `hammer`: The `hammer` is used for `nails`.
* Title `bus`: The `bus` is used for `transportation`.
* Title `car`: The `car` is used for `transportation`.
The text fragements differ just in a words and the tool (e.g. `hammer`, `car`, or `bus`) is used multiple times.
For this use case in general macros are defined.
```
\newcommand{\tool}[2]{Title #1: The #1 is used for #2}  
```
The `[2]` means, that the macro command `\tool` has two parameters.

With that macro you can generate the text fragments above much easier by:
* `\tool{hammer}{nails}`
* `\tool{hammer}{nails}`
* `\tool{hammer}{nails}`
The BracketHandler is able to expand the shorter definitions back to the longer definitions without macros.

For Wikiversity learning resources can handle mathematical expression. But for these mathematical expressions used macros might be expanded to the source latex code.   
```
\int_{4}^{5} f(x) \, dx
\int_{a}^{b} f(y) \, dy
\int_{100}^{200} f(z) \, dz
```
The next line defines the corresponding command named `\cmd` for the use generating an integral with 3 parameters.
```
\newcommand{\cmd}[3]{\int_{#1}^{#2} f(#3) \, d#3}
```
The source definition in LaTeX can be defined by the following command:
```
\cmd{4}{5}{x}
\cmd{a}{b}{y}
\cmd{100}{200}{z}
```
In Wikiversity the command `\cmd` is unknown so the latex command must be expanded to the latex source definition of the command.

### Replacement of Macro Definition
Now we assume the source text will look like this:
```
Text
\newcommand{\tool}[2]{Title #1: The #1 is used for #2}  
\newcommand{\cmd}[3]{\int_{#1}^{#2} f(#3) d#3}

\tool{hammer}{nails}
\tool{car}{transportation}
\tool{cup}{drinking}
Mathematical expressions are
$\cmd{4}{5}{x}$ and $\cmd{a}{b}{y}$
```
The text above ist stored in the variable `latex` in Javascript.
```javascript
var latex="\\newcommand{\\tool}[2]{...";
// parse the newcommands in the string "latex"
var vNewCommands = BracketHandler.parse_newcommands(latex);
```
After parsing the newcommands in the text the variable `vNewCommands` is a JSON with all the parse newcommand definition in the file. `vNewCommands` will look like this for the example:
```json
[
    {
        "name": "\\tool",
        "definition": "Title #1: The #1 is used for #2",
        "params": 2
    },
    {
        "name": "\\cmd",
        "definition": "\\int_{#1}^{#2} f(#3) d#3",
        "params": 3
    }
]
```
Now can use the newcommand definition for replacement in multiple files. You can even output `vNewCommands` with the follwing javascript command formatted in the console.
```javascript
console.log(JSON.stringify(vNewCommands,null,4));
```

### Expand the Macros in the Source
Assume we the same source text above and the definition of new latex commands is stored in the same file with the text that applies the macros (this is not usually the case because for larger documents chapters and the newcommand definitions are stored in a separate file - e.g. the newcommands in file `newcmds.tex`). Nevertheless parsing and replacing can be performed on the same file.
```javascript
var latex="\\newcommand{\\tool}[2]{...";
// parse the newcommands in the string "latex"
var vNewCommands = BracketHandler.parse_newcommands(latex);
var result = BracketHandler.replace_newcommands(latex,vNewCommands);
console.log("Result: "+result);
```

### Recursion Depth
Macros may also contain other LaTeX macros that are defined as newcommands. So replacement of the macro in first recursion may need further replacements of the replaced macros in the newcommand definition.
```
\newcommand{\tool}[2]{\tooltitle{#1} The #1 is used for #2}  
\newcommand{\tooltitle}[1]{Title #1: }

\tool{hammer}{nails}
```
The first recursion will replace the macro `\tool` to the following text:
```
\newcommand{\tool}[2]{\tooltitle{#1} The #1 is used for #2.}  
\newcommand{\tooltitle}[1]{Title #1: }

\tooltitle{hammer} The hammer is used for nails.
```
The second recursion depth with replace the remaining commands (macro calls) for `\tooltitle` to the following text:
```
\newcommand{\tool}[2]{\tooltitle{#1} The #1 is used for #2.}  
\newcommand{\tooltitle}[1]{Title #1: }

Title hammer: The hammer is used for nails.
```
The replacement function `replace_newcommands()` counts the number of recursions in which there is still a marco call found in the text. If the counted successful replacements are 0, then the replacement of newcommands terminates. Nevertheless maximal number of recursions are are set in the library (default is 5). If there function performs more than 5 recursions the replacement of newcommmands are terminated even there are some possible macro replacements remain in the text. The parameter
```javascript
var latex="\\newcommand{\\tool}[2]{...";
// parse the newcommands in the string "latex"
var vNewCommands = BracketHandler.parse_newcommands(latex);
// maximal number of allowed recursion for replacement
var max_recursion = 10;
var result = BracketHandler.replace_newcommands(latex,vNewCommands,mmax_recursion);
console.log("Result: "+result);
```
The maximal number of allowed recursions is defined by
`max_recursion` so that an infinite loop can be avoided. Infinite loops for the replacement occur, if there is a cycle newcommand replacment.
e.g. command `\cmdA` uses `\cmdB` in the definition and
`\cmdB` uses `\cmdA` again in its definition.
```
\newcommand{\cmdA}[1]{This macro A with parameter #1. Call macro B. \cmdB{#1}}  
\newcommand{\cmdB}[1]{This is B for parameter #1. Call \cmdA{Nails} }

\cmdA{hammer}
```
The first recursion expands `\cmdA{hammer}` to:
```
This macro A with parameter hammer.
Call marco B. \cmdB{hammer}}  
```
The first replacement calls now macro B with the parameter `hammer`, which expands to:
```
This macro A with parameter hammer. Call marco B.
This is B for parameter hammer. Call \cmdA{NAILS}
```
Now command A in called again with a different parameter `NAILS`. This expands to:
```
This macro A with parameter hammer. Call marco B.
This is B for parameter hammer. Call
This macro A with parameter NAILS.
Call marco B. \cmdB{NAILS}}  
```
The cyclic replacement would not terminate if `max_recursion` would not be set for preventing the function from getting into an infinite loop.

### Source and Destination of LaTeX Source - Browser
You can create a simple [AppLSAC](https://en.wikiveristy.org/wiki/AppLSAC) with two text areas
* one for the source and
* one for the results of the replacement.

### Create a JSON File for Parsed `newcommands` in NodeJS
To create the file `newcommands.json` for JSON with parsed newcommands use the following example.  
```javascript
var fs = require("fs");

fs.readFile("newcmds.tex", function(err, buf) {
  let latex = buf.toString()
  console.log("Source: "+latex);
  // parse newcommands
  var vNewCommands = BracketHandler.parse_newcommands(latex);
  let data = JSON.stringify(vNewCommands,null,4);
  fs.writeFile("newcommands.json", data, (err) => {
    if (err) console.log(err);
    console.log("vNewCommands saved to newcommands.json.");
  });
});
```

### Requiring Macro Definitions in NodeJS
If you stored the macros in a file `newcommands.json` you can require the JSON and used the newcommands multiple times without the need to parse a source file with newcommand definitions again. This is helpful e.g. for a master thesis where the newcommands are defined in a separate file (e.g. `newcmds.tex`) and the chapters are stored in different files too. So reading the newcommands from a JSON can be performed like this:
```javascript
let vNewCommands = require('./newcommands.json');
```

## Wikiversity
This piece of software was created on GitLab as support material for the learning resource about privacy-friendly webbased applications `AppLSAC`](https://en.wikiversity.org/wiki/AppLSAC) on Wikiversity. An `AppLSAC` run completely in the browser without the need to submit any user generated data to a server. This package `LoadFile4DOM` is designed to learn about the first step:
* **(Load)** Load File into a browser for processing with an HTML5-WebApp (AppLSAC-1 or AppLSAC-2). The library `LoadFile4DOM` serves to cover the loading feature.
* **(Process)** Processing data can be done with any Javascript-libraries of your choice that can perform its task without submission of user generated data to a remote server. `HandleBars4Code` processes a JSON as input (UML for Javascript) to generate the JavaScript library or the `README.md` documentation for a package.
* **(Save)** If users want to save the processed results, it is recommended to look at the [FileSaver.js](https://github.com/eligrey/FileSaver.js) library provided by Eli Grey.

## For Developers
If want to expand the functionality of this library for your purposes
* fork the library on GitHub,
* add more functionality to the file `src/closingbracket.js`.
* run `npm run build`, which updates the `src/main.js` `dist/closingbracket.js`.
* at the very end of the file an associative array is defined that aggregates all the function that you want to export in NodeJS.
