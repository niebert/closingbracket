/* ---------------------------------------
 Exported Module Variable: BracketHandler
 Package:  closingbracket
 Version:  1.0.0  Date: 2020/10/15 15:02:26
 Homepage: https://github.com/niebert/closingbracket#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2020/10/15 15:02:26
 Require Module with:
    const BracketHandler = require('closingbracket');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */
function find_closing_bracket(expression,closebracket,startsearch_at){
    var openbracket = "-";
    var vResult = {
      "start_search": startsearch_at,
      "openbracket_at": -1,
      "closebracket_at": -1
    };
    switch (closebracket) {
      case "]":
          openbracket = "[";
      break;
      case "}":
          openbracket = "{";
      break;
      case ")":
          openbracket = "(";
      break;
      case ">":
          openbracket = "<";
      break;
      default:
          // undefined bracket
          openbracket = "-";
    }
    if (openbracket != "-") {
      var index = startsearch_at;
      // check character at index if it is already
      // the opening bracket.
      while ((index < expression.length) && (expression.charAt(index)!=openbracket)) {
        index++;
      }
      if (index < expression.length) {
        vResult.openbracket_at = index;
        console.log("Opening Bracket '" + openbracket+ "' found at position "+index);
        var bracket_stack = [];
        // Traverse through string starting from
        // given index.
        while (index < expression.length){

            if (expression.charAt(index) == openbracket) {
              // If current character is an
              // opening bracket push it in stack.
              // that is performed for the first bracket as well.
              bracket_stack.push(expression.charAt(index));
            } else {
              // If current character is a closing
              // bracket, remove one opening bracket
              // from the bracket stack - i.e. pop from stack.
              // If bracket stack is empty, then this closing
              // bracket is the corresponding bracket for the
              // first bracket pushed.
              if (expression.charAt(index) == closebracket) {
                bracket_stack.pop();
                if (bracket_stack.length == 0) {
                  console.log("Closing Bracket '" + closebracket+ "' found at position "+index);
                  vResult.closebracket_at = index;
                  index = expression.length;
                }
              }
            }
            index++;
        }

      } else {
        console.error("Opening Bracket not found in expression");
      }
    }
    return vResult;
}
/*
var str = "MyCheck(asdas(iasd)asdas asd) ashdj(sakdjk))";
console.log("String: '" + str +  "'");
var vResult = find_closing_bracket(str,")",2);
console.log("Result: "+JSON.stringify(vResult,null,4));
console.log("Open Char At " + vResult.openbracket_at + ": '" + str.charAt(vResult.openbracket_at) + "'");
console.log("Close Char At " + vResult.closebracket_at + ": '" + str.charAt(vResult.closebracket_at) + "'");
*/

var BracketHandler = {
  "find_closing_bracket": find_closing_bracket
};


// -------NPM Export Variable: BracketHandler---------------
module.exports = BracketHandler;