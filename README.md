# TSL — Time Script Language

TSL (Time Script Language) is a small, simple programming language that compiles to JavaScript.
Designed for learning, game prototyping, and writing clean, readable code with minimal syntax.

**Version:** 1.0.0 &nbsp;|&nbsp; **Status:** Development &nbsp;|&nbsp; **Backend:** JavaScript

---

## Features

- **Simple syntax** — colon (`:`) and indentation for blocks, no braces or keywords
- **Full compiler pipeline** — Lexer → Parser → AST → Validator → Generator
- **JavaScript backend** — generates clean, readable, valid JavaScript
- **Deterministic output** — same source always produces the same JavaScript
- **Rich type support** — numbers, strings, booleans, null, arrays, objects
- **Control flow** — if/else, for, while, break, continue
- **Functions** — declarations, parameters, return, recursion, closures
- **Public functions** — `public function` declarations are exported to `window`
- **Error reporting** — clear errors with filename, line, column, and source context
- **CLI tool** — compile, build, and check from the command line

---

## Quick Start

### Install

```bash
git clone https://github.com/TimeAndTimeStudio/TSL.git
cd TSL
```

No dependencies required. TSL runs on Node.js.

### Compile a TSL file

```bash
node src/cli.js hello.tsl
```

### Build to JavaScript

```bash
# Output to stdout
node src/cli.js build hello.tsl

# Write to file
node src/cli.js build hello.tsl -o hello.js
```

### Run the generated JavaScript

```bash
node hello.js
```

### CLI Commands

```bash
node src/cli.js <file.tsl>          # Compile and show generated JS
node src/cli.js build <file.tsl>    # Build to stdout
node src/cli.js build <file.tsl> -o <output.js>  # Build to file
node src/cli.js check <file.tsl>    # Validate only
node src/cli.js --version           # Show version
```

---

## Example

```tsl
# Fibonacci
function fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

for i in range(10):
    print(fib(i))
```

Compiles to:

```js
function fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

for (let i of range(10)) {
  console.log(fib(i));
}
```

### Public Function Example

```tsl
public function loadingset(bool):
    loading = bool
```

Compiles to:

```js
function loadingset(bool) {
  let loading = bool;
}
window.loadingset = loadingset;
```

---

## Compiler Pipeline

```
TSL Source
    ↓
  Lexer        → Tokens
    ↓
  Parser       → AST
    ↓
  Validator    → Valid AST
    ↓
  Generator    → JavaScript
    ↓
  JavaScript   → Runtime
```

---

## Tests

```bash
# Run all tests
npm test
```

**Test suites:**
- AST
- Lexer
- Parser
- Validator
- Generator
- Variable Semantics
- Integration
- CLI

---

## Project Structure

```
tsl/
├── src/
│   ├── cli.js        # Command-line interface
│   ├── lexer.js      # Tokenizer
│   ├── parser.js     # Expression & statement parser
│   ├── ast.js        # AST node definitions
│   ├── validator.js  # Semantic validation
│   ├── generator.js  # JavaScript code generation
│   └── errors.js     # Error types
├── tests/            # Unit & integration tests
│   ├── ast/
│   ├── cli/
│   ├── generator/
│   ├── integration/
│   ├── lexer/
│   ├── parser/
│   └── validator/
└── website/          # Project website
```

---

## License

GPL-3.0
