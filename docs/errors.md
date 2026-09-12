# TSL Error System

## Status

```text
Version: 1.0
File: src/errors.js
```

---

## Overview

TSL errors are categorized by the phase that detects them. Every compiler error includes source location information for precise error reporting.

Runtime errors follow standard JavaScript error behavior.

---

## Error Categories

| Category | Source Class | Phase |
|---|---|---|
| Lexer Error | `LexerError` | Tokenization |
| Parser Error | `ParserError` | Parsing |
| Semantic Error | `ValidationError` | Validation |
| Generator Error | `GeneratorError` | Code Generation |
| Runtime Error | `RuntimeError` | Execution |

---

## Error Format

Compiler errors display as:

```
TSL <Type> Error

<filename>:<line>:<column>

<source line>
<pointer>

<message>
```

Example:

```
TSL Lexer Error

game.tsl:5:12

x = "hello
            ^

Unterminated string literal
```

---

## Error Properties

Every TSL error has these properties:

| Property | Type | Description |
|---|---|---|
| `errorType` | `string` | One of: `"Lexer Error"`, `"Parser Error"`, `"Semantic Error"`, `"Generator Error"`, `"Runtime Error"` |
| `filename` | `string` | Source file name |
| `line` | `number` | Line number (1-based) |
| `column` | `number` | Column number (1-based) |
| `sourceLine` | `string` | The source line that caused the error |
| `message` | `string` | Human-readable error description |
| `name` | `string` | JavaScript `Error.name` (e.g., `"LexerError"`) |

---

## Lexer Errors

Thrown during tokenization when the source contains invalid characters or malformed literals.

### Unexpected Character

Raised when the lexer encounters a character it does not recognize.

```
TSL Lexer Error

code.tsl:1:1

@
^

Unexpected character '@'
```

### Unterminated String

Raised when a string literal is not closed before end of source.

```
TSL Lexer Error

code.tsl:3:8

msg = "hello
        ^

Unterminated string literal
```

### Unexpected Indentation

Raised when indentation does not match any open block level.

```
TSL Lexer Error

code.tsl:5:1

    print(x)
^

Unexpected indentation (expected 4, got 8)
```

---

## Parser Errors

Thrown during parsing when the token stream does not match expected grammar.

### Expected Token

Raised when a specific token type was expected but a different one was found.

```
TSL Parser Error

code.tsl:12:8

draw_rect(x y 100 100)
            ^

Expected COMMA but found IDENTIFIER
```

### Unexpected Token

Raised when a token appears in a context where no statement or expression is expected.

```
TSL Parser Error

code.tsl:3:1

@
^

Unexpected token: AT
```

### Expected Expression

Raised when the parser expected an expression but found something else.

```
TSL Parser Error

code.tsl:5:1

if :
   ^

Expected expression but found COLON
```

### Missing Block Colon

Raised when a block is expected but the colon delimiter is missing.

```
TSL Parser Error

code.tsl:1:8

if x > 10
        ^

Expected ':' at start of block
```

---

## Semantic Errors

Thrown during validation when the AST is syntactically valid but semantically incorrect. The error class is `ValidationError` with `errorType: "Semantic Error"`.

### Return Outside Function

```
TSL Semantic Error

code.tsl:3:1

return 42
^

return outside function
```

### Break Outside Loop

```
TSL Semantic Error

code.tsl:5:5

break
^

break outside loop
```

### Continue Outside Loop

```
TSL Semantic Error

code.tsl:7:5

continue
^

continue outside loop
```

---

## Generator Errors

Thrown during code generation when the generator encounters an unexpected AST node type.

### Unknown Node Type

```
TSL Generator Error

code.tsl:1:1

...

Unknown node type: UnknownNode
```

---

## Runtime Errors

Runtime errors occur during JavaScript execution. They are not wrapped by TSL's error classes and follow standard JavaScript `Error` behavior.

Example — calling an undefined function:

```js
// Generated JS calls undefined function
undefinedFunc();
// ReferenceError: undefinedFunc is not defined
```

Example — type error:

```js
// Generated JS performs invalid operation
"hello" + { x: 1 };
// TypeError: Cannot convert object to primitive value
```

---

## Error Classes

### `TSL` (base class)

```javascript
class TSL extends Error {
  constructor(errorType, message, filename, line, column, sourceLine)
}
```

Base class for all TSL-specific errors.

### `LexerError`

```javascript
class LexerError extends TSL {
  constructor(message, filename, line, column, sourceLine)
}
```

### `ParserError`

```javascript
class ParserError extends TSL {
  constructor(message, filename, line, column, sourceLine)
}
```

### `ValidationError`

```javascript
class ValidationError extends TSL {
  constructor(message, filename, line, column, sourceLine)
}
```

### `GeneratorError`

```javascript
class GeneratorError extends TSL {
  constructor(message, filename, line, column, sourceLine)
}
```

### `RuntimeError`

```javascript
class RuntimeError extends TSL {
  constructor(message, filename, line, column, sourceLine)
}
```

---

## Error Type Constants

```javascript
const ErrorType = {
  LEXER: 'Lexer Error',
  PARSER: 'Parser Error',
  SEMANTIC: 'Semantic Error',
  GENERATOR: 'Generator Error',
  RUNTIME: 'Runtime Error',
};
```

---

## Error Handling

### In CLI

The CLI catches all errors and prints them via `err.toString()`:

```javascript
try {
  compileSource(source, filename);
} catch (err) {
  console.error(err.toString());
  process.exit(1);
}
```

### Programmatic Usage

```javascript
const { tokenize } = require('tsl/src/lexer');
const { createParser } = require('tsl/src/parser');
const { createValidator } = require('tsl/src/validator');
const { createGenerator } = require('tsl/src/generator');

try {
  const tokens = tokenize(source, 'game.tsl');
  const parser = createParser(tokens, source, 'game.tsl');
  const body = parser.parseStatements();
  const ast = Program(body, { line: 1, column: 0, endLine: 1, endColumn: 0 });
  createValidator(source, 'game.tsl').validate(ast);
  const jsCode = createGenerator(source, 'game.tsl').generate(ast);
} catch (err) {
  if (err.errorType) {
    console.error(`${err.errorType}: ${err.message}`);
    console.error(`${err.filename}:${err.line}:${err.column}`);
  } else {
    console.error(err.message);
  }
}
```

---

## Error Flow

```
Source
  ↓
Lexer → LexerError (invalid characters, unterminated strings, bad indentation)
  ↓
Parser → ParserError (unexpected tokens, missing delimiters)
  ↓
Validator → ValidationError (break/return outside context)
  ↓
Generator → GeneratorError (unknown AST nodes)
  ↓
JavaScript Runtime → Runtime Error (execution failures)
```

---

## Out of Scope

The following are NOT part of TSL v1.0 error handling:

```text
Error recovery (parser aborts on first error)
Error recovery hints or suggestions
Error codes or error numbers
Error severity levels
Error suppression
Error grouping or batching
Stack trace formatting
Custom error codes
```
