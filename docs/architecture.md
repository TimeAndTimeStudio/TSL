# TSL Architecture

TSL is a small, indentation-based programming language that transpiles to JavaScript.

## Language Philosophy

- Transpiles to JavaScript (no VM, no bytecode, no JIT)
- Indentation-based blocks (no `end` keyword)
- No type system
- Small and predictable
- Each stage has clear input/output

## Project Structure

```
TSL/
├── src/
│   ├── cli.js        # CLI entry point, compileSource()
│   ├── errors.js     # Error classes
│   ├── ast.js        # AST node classes
│   ├── lexer.js      # Lexer (tokenizer)
│   ├── parser.js     # Parser (AST builder)
│   ├── validator.js  # Semantic validator
│   └── generator.js  # JavaScript generator
├── examples/         # .tsl example files
├── docs/             # Documentation
├── package.json      # Project config
└── SPEC.md           # Language specification
```

## Compilation Pipeline

```
Source Code (.tsl)
    ↓
Lexer → Token[]
    ↓
Parser → AST
    ↓
Validator → (errors)
    ↓
Generator → JavaScript
```

Each stage is independent. The output of one stage is the input of the next.

## Source Files

### src/lexer.js

The lexer tokenizes source code into a stream of tokens.

**Key exports:**

- `TokenType` — object with all token type constants
- `Token` — class with properties: `type`, `value`, `line`, `column`
- `tokenize(source, filename)` — returns `Token[]`
- `createLexer(source, filename)` — returns `{ tokenize }`

**Token types:**

| Category | Token Types |
|----------|-------------|
| Literals | `NUMBER`, `STRING` |
| Identifiers | `IDENTIFIER` |
| Keywords | `IF`, `ELSE`, `FOR`, `IN`, `WHILE`, `FUNCTION`, `RETURN`, `BREAK`, `CONTINUE`, `PASS`, `TRUE`, `FALSE`, `NULL`, `AND`, `OR`, `NOT` |
| Operators | `PLUS`, `MINUS`, `STAR`, `SLASH`, `PERCENT`, `EQUAL`, `EQUAL_EQUAL`, `NOT_EQUAL`, `LESS`, `LESS_EQUAL`, `GREATER`, `GREATER_EQUAL` |
| Delimiters | `LPAREN`, `RPAREN`, `LBRACKET`, `RBRACKET`, `LBRACE`, `RBRACE`, `COMMA`, `DOT`, `COLON` |
| Structure | `NEWLINE`, `INDENT`, `DEDENT`, `EOF` |

**Whitespace handling:**

- Spaces and tabs are used for indentation-based blocks
- Blank lines are skipped (NEWLINE is still emitted)
- Mixed tabs/spaces in indentation causes a LexerError
- Indentation is tracked via an indent stack

**Comments:**

- Line comments start with `#` and extend to end of line

### src/parser.js

The parser consumes tokens and builds an AST.

**Key exports:**

- `createParser(tokens, source, filename)` — returns `{ parseExpression, parseStatements, parsePrimary, parseUnary, parseStatement, parseBlock }`

**Parser methods:**

- `parseStatements()` — parses a list of statements until EOF
- `parseStatement()` — parses a single statement (dispatches by keyword)
- `parseExpression()` — parses an expression using precedence climbing
- `parsePrimary()` — parses primary expressions (literals, identifiers, groups)
- `parseUnary()` — parses unary expressions (`not`)
- `parseBlock()` — parses an indented block (expects `:`, `INDENT`, statements, `DEDENT`)

**Operator precedence (lowest to highest):**

| Precedence | Operators |
|------------|-----------|
| 1 | `or` |
| 2 | `and` |
| 3 | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| 4 | `+`, `-` |
| 5 | `*`, `/`, `%` |

**Statement types parsed:**

- `IfStatement` — `if condition:` with optional `else:`
- `ForStatement` — `for variable in iterable:`
- `WhileStatement` — `while condition:`
- `FunctionDeclaration` — `function name(params):`
- `ReturnStatement` — `return [expression]`
- `BreakStatement`, `ContinueStatement`, `Pass`
- `Assignment` — `identifier = expression` (supports member access and array access)
- `ExpressionStatement` — any expression as a statement

### src/ast.js

Defines all AST node factory functions.

**Key exports:**

- `Location(line, column, endLine, endColumn)` — source location
- `Program(body, location)` — root node, `body` is an array of statements

**Literal nodes:**

- `NumberLiteral(value, location)`
- `StringLiteral(value, location)`
- `BooleanLiteral(value, location)`
- `NullLiteral(location)`

**Expression nodes:**

- `Identifier(name, location)`
- `BinaryExpression(operator, left, right, location)`
- `UnaryExpression(operator, argument, location)`
- `CallExpression(callee, arguments, location)`
- `ArrayExpression(elements, location)`
- `ObjectExpression(properties, location)`
- `Property(key, value, location)`
- `MemberExpression(object, property, location)`
- `ArrayAccess(object, index, location)`

**Statement nodes:**

- `Assignment(left, right, location)`
- `IfStatement(condition, consequent, alternate, location)`
- `WhileStatement(condition, body, location)`
- `ForStatement(variable, iterable, body, location)`
- `FunctionDeclaration(name, parameters, body, location)`
- `ReturnStatement(argument, location)`
- `BreakStatement(location)`
- `ContinueStatement(location)`

All nodes extend `ASTNode` and have a `location` property.

### src/validator.js

Performs semantic validation on the AST.

**Key exports:**

- `createValidator(source, filename)` — returns `{ validate }`
- `ValidationError` — thrown on semantic errors

**Validation rules:**

- `return` outside function → ValidationError
- `break` outside loop → ValidationError
- `continue` outside loop → ValidationError

**Implementation:**

- Uses a context object `{ inFunction, inLoop }` that is propagated through nested structures
- First error is thrown; validation stops

### src/generator.js

Translates the AST into JavaScript source code.

**Key exports:**

- `createGenerator(source, filename)` — returns `{ generate }`
- `GeneratorError` — thrown on generator errors

**Scope management:**

- `scopeStack` — array of Sets, one per lexical scope
- `declareVar(name)` — marks a variable as declared in current scope
- `isDeclared(name)` — checks if a variable is declared in any scope
- `pushScope()` / `popScope()` — manage nesting depth via `indentLevel`

**Variable declaration logic:**

- First assignment to a name in any scope → `let name = value;`
- Subsequent assignments → `name = value;`
- Member access assignments (e.g., `player.x = 100`) → `player.x = 100;` (no `let`)
- Array access assignments (e.g., `arr[0] = 10`) → `arr[0] = 10;` (no `let`)

**Code generation rules:**

| TSL | JavaScript |
|-----|-----------|
| `and` | `&&` |
| `or` | `||` |
| `not` | `!` |
| `for x in y:` | `for (let x of y) {` |
| `if cond:` | `if (cond) {` |
| `while cond:` | `while (cond) {` |
| `function name(params):` | `function name(params) {` |
| `pass` | `// pass` |
| `break` | `break;` |
| `continue` | `continue;` |
| String literals | `JSON.stringify()` (adds quotes) |
| Number literals | `String(value)` |
| Boolean literals | `true` / `false` |
| `null` | `null` |

### src/errors.js

Defines error classes for all compilation stages.

**Key exports:**

- `ErrorType` — object with: `LEXER`, `PARSER`, `SEMANTIC`, `GENERATOR`, `RUNTIME`
- `TSL` — base error class, all errors extend this
- `LexerError`, `ParserError`, `ValidationError`, `GeneratorError`, `RuntimeError`
- `getSourceLine(source, lineNum)` — extracts source line from source code

**Error properties (inherited from `TSL`):**

- `errorType` — string from ErrorType
- `filename` — source file name
- `line` — line number
- `column` — column number
- `sourceLine` — the actual source line text
- `message` — human-readable error message
- `name` — class name (e.g., `LexerError`)

### src/cli.js

Command-line interface and compilation pipeline orchestrator.

**Key exports:**

- `compileSource(source, filename)` — runs full pipeline: Lexer → Parser → Validator → Generator
- `runCommand(file)` — compile and display generated JS
- `buildCommand(file, outputFile)` — compile and write to file
- `checkCommand(file)` — validate without output
- `showVersion()` — prints `TSL v1.0.0`

**CLI commands:**

```bash
tsl <file.tsl>          # Compile and display generated JavaScript
tsl build <file.tsl>    # Compile (display or write with -o)
tsl build <file.tsl> -o <output.js>  # Compile and write to file
tsl check <file.tsl>    # Validate only
tsl --version           # Print version
```

**Pipeline (compileSource):**

1. `tokenize(source, filename)` → `Token[]`
2. `createParser(tokens, source, filename)` → parser instance
3. `parser.parseStatements()` → array of AST nodes
4. `Program(body, location)` → AST root
5. `createValidator(source, filename)` → validator instance
6. `validator.validate(ast)` → throws on error
7. `createGenerator(source, filename)` → generator instance
8. `generator.generate(ast)` → JavaScript string

**Output format:**

```js
{
  ast: ASTNode,   // the parsed AST
  jsCode: string  // generated JavaScript
}
```

## Design Decisions

### No VM, No Bytecode

TSL transpiles directly to JavaScript. There is no intermediate representation, no virtual machine, no JIT compilation. The generated code runs on any JavaScript engine (Node.js, browsers).

### Indentation-Based Blocks

Blocks are delimited by indentation, not by keywords like `end` or braces. The lexer emits `INDENT` and `DEDENT` tokens. The parser expects a colon (`:`) before indented blocks.

### No Type System

TSL has no type declarations, no type checking, and no type inference. All types are JavaScript types.

### Scope Tracking

Variable declarations are tracked via a stack of Sets in the generator. A variable is declared with `let` on first assignment within any scope, and reassigned without `let` on subsequent uses.

### Error Handling

All errors include: `errorType`, `filename`, `line`, `column`, `sourceLine`, `message`. Each compilation stage has its own error class.

### Language Constructs

- **No classes** — JavaScript objects are used directly
- **No modules** — no import/export
- **No try/catch** — not implemented
- **No arrays with non-integer indices** — array access uses expressions but JavaScript arrays are used as-is
- **Objects use colon syntax** — `{ key: value, ... }`

## Generated Code Characteristics

- Deterministic: same input always produces same output
- Readable: uses 2-space indentation
- Valid JavaScript: runs on any JS engine
- No optimization: code is faithful to source, not transformed

## Example Compilation

```tsl
# TSL source
function greet(name):
    print("Hello, " + name)

greet("World")
```

Compiles to:

```js
function greet(name) {
  print("Hello, " + name);
}
greet("World");
```
