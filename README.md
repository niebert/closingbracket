# Closing Bracket Search
Find in a string a closing bracket for an opening bracket. The search function will start from a specific start index in the string, identifies the start index of the next corresponding opening bracket and finds the corresponding closing bracket provided as parameter. The search function return a object withe the start index, the index of opening bracket and the index of the closing bracket.

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
\newcommand{\cmd}[3]{\int_{#1}^{#2} f(#3) d#3}
```
The source definition in LaTeX can be defined by the following command:
```
\cmd{4}{5}{x}
\cmd{a}{b}{y}
\cmd{100}{200}{z}
```


## Allowed Brackets
The bracket handler allows the following closing brackets:
* `)` with corresponding opening bracket `(`
* `}` with corresponding opening bracket `{`
* `]` with corresponding opening bracket `[`
* `<` with corresponding opening bracket `>`
