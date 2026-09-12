# TSL Compiler

## Overview

The TSL compiler is a 4-stage transpiler that converts TSL source code (`.tsl`) into JavaScript.

```text
TSL Source → Lexer → Parser → Validator → Generator → JavaScript
```

**Version:** 1.0.0

---

## Compiler Pipeline

### Stage 1 — Lexer (`src/lexer.js`)

The lexer reads the source file as a string and tokenizes it into a list of tokens.

#### Token Types

| Category | Token | Example |
|----------|-------|---------|
| Literals | `NUMBER` | `42`, `3.14` |
| Literals | `STRING` | `"hello"`, `'world'` |
| Literals | `IDENTIFIER` | `x`, `player_x`, `_value` |
| Keywords | `IF`, `ELSE` | `if`, `else` |
| Keywords | `FOR`, `IN` | `for`, `in` |
| Keywords | `WHILE` | `while` |
| Keywords | `FUNCTION` | `function` |
| Keywords | `RETURN` | `return` |
| Keywords | `BREAK`, `CONTINUE` | `break`, `continue` |
| Keywords | `PASS` | `pass` |
| Keywords | `TRUE`, `FALSE` | `true`, `false` |
| Keywords | `NULL` | `null` |
| Keywords | `AND`, `OR`, `NOT` | `and`, `or`, `not` |
| Operators | `PLUS`, `MINUS` | `+`, `-` |
| Operators | `STAR`, `SLASH`, `PERCENT` | `*`, `/`, `%` |
| Operators | `EQUAL`, `EQUAL_EQUAL`, `NOT_EQUAL` | `=`, `==`, `!=` |
| Operators | `LESS`, `LESS_EQUAL`, `GREATER`, `GREATER_EQUAL` | `<`, `<=`, `>`, `>=` |
| Delimiters | `LPAREN`, `RPAREN` | `(`, `)` |
| Delimiters | `LBRACKET`, `RBRACKET` | `[`, `]` |
| Delimiters | `LBRACE`, `RBRACE` | `{`, `}` |
| Delimiters | `COMMA`, `DOT`, `COLON` | `,`, `.`, `:` |
| Structure | `NEWLINE`, `INDENT`, `DEDENT` | — |
| Structure | `EOF` | — |

#### Keywords

The following identifiers are reserved and cannot be used as variable names:

```
if, else, for, in, while, function, return, break, continue, pass, true, false, null, and, or, not
```

#### Comments

Comments use `#` and extend to the end of the line. They are discarded by the lexer and do not appear in the AST.

```tsl
# This is a comment
```

#### String Literals

TSL supports both double-quoted (`"..."`) and single-quoted (`'...'`) strings with escape sequences:

| Escape | Result |
|--------|--------|
| `\n` | newline |
| `\t` | tab |
| `\\` | backslash |
| `\"` | double quote |
| `\'` | single quote |

Unterminated strings produce a `LexerError`.

#### Number Literals

Integers and decimal numbers are supported. Both are stored as JavaScript `Number`.

```tsl
10
42
3.14
0.5
```

#### Indentation

TSL uses indentation to define blocks (similar to Python). The lexer tracks indentation levels using a stack:

- When indentation increases: emit `INDENT`
- When indentation decreases: emit `DEDENT`
- Mismatched indentation produces a `LexerError`

Tabs are not supported for indentation — only spaces are counted.

#### Example

Input:

```tsl
if x > 10:
    print(x)
```

Tokens (simplified):

```
IF, IDENTIFIER("x"), GREATER(">"), NUMBER(10), COLON, NEWLINE, INDENT, IDENTIFIER("print"), LPAREN, RPAREN, NEWLINE, DEDENT, EOF
```

---

### Stage 2 — Parser (`src/parser.js`)

The parser takes the token list from the lexer and builds an Abstract Syntax Tree (AST) using precedence climbing.

#### Expression Parsing

The parser handles the following expression constructs:

| Construct | TSL Syntax | AST Node |
|-----------|-----------|----------|
| Literals | `42`, `"hello"`, `true`, `null` | `NumberLiteral`, `StringLiteral`, `BooleanLiteral`, `NullLiteral` |
| Identifier | `x` | `Identifier` |
| Binary expression | `a + b` | `BinaryExpression` |
| Unary expression | `not x` | `UnaryExpression` |
| Function call | `foo(a, b)` | `CallExpression` |
| Array access | `arr[0]` | `ArrayAccess` |
| Member access | `obj.prop` | `MemberExpression` |
| Array literal | `[1, 2, 3]` | `ArrayExpression` |
| Object literal | `{ key: value }` | `ObjectExpression` |
| Grouped expression | `(expr)` | wraps inner expression |

#### Operator Precedence

The parser uses precedence climbing with the following levels (low to high):

| Precedence | Operators |
|------------|-----------|
| 1 (lowest) | `or` |
| 2 | `and` |
| 3 | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| 4 | `+`, `-` |
| 5 (highest) | `*`, `/`, `%` |

#### Statement Parsing

The parser handles the following statement types:

| Statement | TSL Syntax | AST Node |
|-----------|-----------|----------|
| Assignment | `x = expr` | `Assignment` |
| If | `if cond:` | `IfStatement` |
| If/Else | `if cond: ... else:` | `IfStatement` (with `alternate`) |
| For | `for var in expr:` | `ForStatement` |
| While | `while cond:` | `WhileStatement` |
| Function | `function name(params):` | `FunctionDeclaration` |
| Return | `return expr` | `ReturnStatement` |
| Break | `break` | `BreakStatement` |
| Continue | `continue` | `ContinueStatement` |
| Pass | `pass` | `Pass` |
| Expression | `expr` | `ExpressionStatement` |

#### Block Parsing

Blocks are introduced by a colon (`:`) followed by an `INDENT` token. The parser reads statements until a `DEDENT` token is encountered.

```tsl
if condition:
    statement1
    statement2
```

#### Example

Input:

```tsl
x = 10
if x > 5:
    print(x)
```

AST (simplified):

```
Program
  body:
    - Assignment(Identifier("x"), NumberLiteral(10))
    - IfStatement(
        condition: BinaryExpression(">", Identifier("x"), NumberLiteral(5)),
        consequent: [ExpressionStatement(CallExpression(Identifier("print"), [Identifier("x")]))]
      )
```

---

### Stage 3 — Validator (`src/validator.js`)

The validator performs semantic analysis on the AST. It does not implement a type system.

#### Validation Rules

| Rule | Error |
|------|-------|
| `return` outside function | `return outside function` |
| `break` outside loop | `break outside loop` |
| `continue` outside loop | `continue outside loop` |

The validator tracks context as it traverses:

- `inFunction`: true when inside a `FunctionDeclaration`
- `inLoop`: true when inside a `ForStatement` or `WhileStatement`

#### Example

Invalid:

```tsl
return 10
```

Produces:

```
Semantic Error: return outside function
```

---

### Stage 4 — Generator (`src/generator.js`)

The generator takes the validated AST and produces JavaScript source code.

#### Variable Declarations

The generator tracks variable declarations using a scope stack:

- First assignment to a variable in a scope: generates `let varName = ...;`
- Subsequent assignments in the same scope: generates `varName = ...;`
- Member access assignments (`obj.prop = ...`) and array access assignments (`arr[0] = ...`) do not generate `let`

#### Scope Management

The generator uses a stack of sets to track declared variables:

- `pushScope()`: creates a new scope (called for function bodies, if/else, loops)
- `popScope()`: removes the current scope
- `declareVar(name)`: adds a variable to the current scope
- `isDeclared(name)`: checks if a variable exists in any scope

#### Generated JavaScript

| TSL | Generated JavaScript |
|-----|---------------------|
| `x = 10` | `let x = 10;` |
| `x = 20` | `x = 20;` |
| `if cond:` | `if (cond) { ... }` |
| `if cond: ... else:` | `if (cond) { ... } else { ... }` |
| `for var in iterable:` | `for (let var of iterable) { ... }` |
| `while cond:` | `while (cond) { ... }` |
| `function name(params):` | `function name(params) { ... }` |
| `return expr` | `return expr;` |
| `break` | `break;` |
| `continue` | `continue;` |
| `pass` | `// pass` |
| `true` / `false` | `true` / `false` |
| `null` | `null` |
| `not x` | `(!x)` |
| `a and b` | `(a && b)` |
| `a or b` | `(a \|\| b)` |
| `[1, 2, 3]` | `[1, 2, 3]` |
| `{ key: value }` | `{ key: value }` |
| `obj.prop` | `obj.prop` |
| `arr[idx]` | `arr[idx]` |
| `func(a, b)` | `func(a, b)` |

#### Indentation

Generated JavaScript uses 2-space indentation.

---

## Error System

Errors are categorized and include location information:

| Error Type | Class | Thrown By |
|------------|-------|-----------|
| Lexer Error | `LexerError` | `src/lexer.js` |
| Parser Error | `ParserError` | `src/parser.js` |
| Semantic Error | `ValidationError` | `src/validator.js` |
| Generator Error | `GeneratorError` | `src/generator.js` |
| Runtime Error | `RuntimeError` | — |

Each error includes:

| Property | Description |
|----------|-------------|
| `errorType` | Category string |
| `filename` | Source file name |
| `line` | Line number (1-based) |
| `column` | Column number (1-based) |
| `message` | Human-readable description |
| `sourceLine` | The source code line where the error occurred |
| `stack` | JavaScript stack trace |

#### Common Errors

| Error | Cause |
|-------|-------|
| `Unexpected character 'X'` | Lexer encountered an unsupported character |
| `Unterminated string literal` | String missing closing quote |
| `Expected COLON but found ...` | Block missing colon after `if`, `for`, `while`, or `function` |
| `Expected RPAREN but found ...` | Function call or parameter list missing closing parenthesis |
| `return outside function` | `return` used outside a function body |
| `break outside loop` | `break` used outside a loop |
| `Unexpected indentation` | Indentation does not match expected level |

---

## CLI

### Usage

```bash
node src/cli.js <file.tsl>
node src/cli.js build <file.tsl> [-o <output.js>]
node src/cli.js check <file.tsl>
node src/cli.js --version
```

### Commands

| Command | Description |
|---------|-------------|
| `tsl <file.tsl>` | Compile and display generated JavaScript |
| `tsl build <file.tsl>` | Compile and display generated JavaScript |
| `tsl build <file.tsl> -o <output.js>` | Compile and write to file |
| `tsl check <file.tsl>` | Validate without output |
| `tsl --version` | Print version |

### Programmatic Usage

```js
const { compileSource } = require('./src/cli');
const result = compileSource('myfile.tsl', sourceCode);
// result.ast      -> AST node
// result.jsCode   -> Generated JavaScript string
```

---

## AST Node Reference

| Node | Properties |
|------|-----------|
| `Program` | `body: Statement[]` |
| `NumberLiteral` | `value: number` |
| `StringLiteral` | `value: string` |
| `BooleanLiteral` | `value: boolean` |
| `NullLiteral` | — |
| `Identifier` | `name: string` |
| `BinaryExpression` | `operator: string`, `left: Expression`, `right: Expression` |
| `UnaryExpression` | `operator: string`, `argument: Expression` |
| `CallExpression` | `callee: Expression`, `arguments: Expression[]` |
| `MemberExpression` | `object: Expression`, `property: Identifier` |
| `ArrayAccess` | `object: Expression`, `index: Expression` |
| `ArrayExpression` | `elements: Expression[]` |
| `ObjectExpression` | `properties: Property[]` |
| `Property` | `key: Identifier`, `value: Expression` |
| `Assignment` | `left: Expression`, `right: Expression` |
| `IfStatement` | `condition: Expression`, `consequent: Statement[]`, `alternate: Statement[] \| null` |
| `ForStatement` | `variable: Identifier`, `iterable: Expression`, `body: Statement[]` |
| `WhileStatement` | `condition: Expression`, `body: Statement[]` |
| `FunctionDeclaration` | `name: Identifier`, `parameters: Identifier[]`, `body: Statement[]` |
| `ReturnStatement` | `argument: Expression \| null` |
| `BreakStatement` | — |
| `ContinueStatement` | — |
| `Pass` | — |
| `ExpressionStatement` | `expression: Expression` |
| `Location` | `line`, `column`, `endLine`, `endColumn` |

Every AST node has a `type` property and a `location` property.

---

## File Structure

```text
src/
  ast.js        -> AST node constructors
  lexer.js      -> Tokenizer (Stage 1)
  parser.js     -> AST builder (Stage 2)
  validator.js  -> Semantic analysis (Stage 3)
  generator.js  -> JavaScript code generation (Stage 4)
  errors.js     -> Error types and utilities
  cli.js        -> Command-line interface
```

---

## Design Principles

1. **4-stage pipeline** — Lexer, Parser, Validator, Generator operate independently
2. **AST is the central representation** — Parser and Generator share the same AST
3. **No string replacement** — Code generation traverses the AST
4. **No type system** — Validation is limited to control flow rules
5. **No VM or bytecode** — Output is plain JavaScript
6. **Deterministic output** — Same source always produces the same JavaScript
7. **Smallest correct change** — Implementation follows SPEC without extra features
