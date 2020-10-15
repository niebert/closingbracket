# Closing Bracket Search
Find in a string a closing bracket for an opening bracket. The search function will start from a specific start index in the string, identifies the start index of the next corresponding opening bracket and finds the corresponding closing bracket provided as parameter. The search function return a object withe the start index, the index of opening bracket and the index of the closing bracket.

## Usage Browser
Use a script tag and import the library `closingbracket.js` with:
```html
<script src="js/filesaver.js"></script>
```
The script tag assumes that the library was stored in the subdirectory `js/` of your web project.

With the import of the script you have a bracket handler `BracketHandler` available that provides the functionality for handling corresponding opening and closing brackets.

```javascript
var str = "MyCheck(char,(iasd+2),add(3,4)); another_call(x,(y+20),(84*4))";
var vResult = BracketHandler.find_closing_bracket(str,")",2);
```
The function above start search for the closing bracket `)` beginning from index 2 (i.e. the `C` of `MyCheck...`). It finds the corresponding opening bracket `(` at position 7. and the closing bracket `)` at position 30. The function `find_closing_bracket()` returns a JSON of the following structure:
```json
vResult = {
  "start_search": 2,
  "openbracket_at": 7,
  "closebracket_at": 30
};
```

## Allowed Brackets
The bracket handler allows the following closing brackets:
* `)` with corresponding opening bracket `(`
* `}` with corresponding opening bracket `{`
* `]` with corresponding opening bracket `[`
* `<` with corresponding opening bracket `>` 
