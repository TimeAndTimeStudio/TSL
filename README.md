# TSL — Small Language for JavaScript

TSL (Time Script Language) is a small, simple programming language that compiles to JavaScript.
Designed for learning, game prototyping, and writing clean, readable code with minimal syntax.

**Version:** 1.0.0 &nbsp;|&nbsp; **Status:** Stable &nbsp;|&nbsp; **Backend:** JavaScript

---

## Features

- **Simple syntax** — colon (`:`) and indentation for blocks, no braces or keywords
- **Full compiler pipeline** — Lexer → Parser → AST → Validator → Generator
- **JavaScript backend** — generates clean, readable, valid JavaScript
- **Deterministic output** — same source always produces the same JavaScript
- **Rich type support** — numbers, strings, booleans, null, arrays, objects
- **Control flow** — if/else, for, while, break, continue
- **Functions** — declarations, parameters, return, recursion, closures
- **Error reporting** — clear errors with filename, line, column, and source context
- **CLI tool** — build, check, and run from the command line
- **100+ examples** — algorithms, data structures, and game patterns

---

## Quick Start

### Install

```bash
npm install
```

### Run a TSL file

```bash
node src/cli.js hello.tsl
```

### Build to JavaScript

```bash
# Output to stdout
node src/cli.js hello.tsl

# Write to file
node src/cli.js hello.tsl -o hello.js
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

## Documentation

| Topic | File |
|-------|------|
| Project overview | [docs/README.md](docs/README.md) |
| Getting started | [docs/getting-started.md](docs/getting-started.md) |
| Language reference | [docs/language.md](docs/language.md) |
| Syntax reference | [docs/syntax.md](docs/syntax.md) |
| Variables | [docs/variables.md](docs/variables.md) |
| Data types | [docs/data-types.md](docs/data-types.md) |
| Operators | [docs/operators.md](docs/operators.md) |
| Control flow | [docs/control-flow.md](docs/control-flow.md) |
| Functions | [docs/functions.md](docs/functions.md) |
| Arrays | [docs/arrays.md](docs/arrays.md) |
| Objects | [docs/objects.md](docs/objects.md) |
| CLI | [docs/cli.md](docs/cli.md) |
| Errors | [docs/errors.md](docs/errors.md) |
| Compiler architecture | [docs/compiler.md](docs/compiler.md) |
| Project architecture | [docs/architecture.md](docs/architecture.md) |
| Examples | [docs/examples.md](docs/examples.md) |
| Specification | [docs/syntax.md](docs/syntax.md) |

---

## Examples

### Basic

| Example | Description |
|---------|-------------|
| [hello.tsl](examples/hello.tsl) | Hello World |
| [variables.tsl](examples/variables.tsl) | Variables and assignment |
| [math.tsl](examples/math.tsl) | Arithmetic operations |
| [if.tsl](examples/if.tsl) | If statement |
| [while.tsl](examples/while.tsl) | While loop |
| [for.tsl](examples/for.tsl) | For loop |
| [functions.tsl](examples/functions.tsl) | Function declaration |
| [arrays.tsl](examples/arrays.tsl) | Arrays |
| [objects.tsl](examples/objects.tsl) | Objects |

### Algorithms

| Example | Description |
|---------|-------------|
| [fibonacci.tsl](examples/fibonacci.tsl) | Recursive Fibonacci |
| [bubble_sort.tsl](examples/bubble_sort.tsl) | Bubble sort |
| [quick_sort.tsl](examples/quick_sort.tsl) | Quick sort |
| [merge_sort.tsl](examples/merge_sort.tsl) | Merge sort |
| [binary_search.tsl](examples/binary_search.tsl) | Binary search |
| [factorial_loop.tsl](examples/factorial_loop.tsl) | Factorial |
| [gcd.tsl](examples/gcd.tsl) | Greatest common divisor |
| [prime.tsl](examples/prime.tsl) | Prime check |

### Data Structures

| Example | Description |
|---------|-------------|
| [stack.tsl](examples/stack.tsl) | Stack |
| [queue.tsl](examples/queue.tsl) | Queue |
| [linked_list.tsl](examples/linked_list.tsl) | Linked list |
| [binary_tree.tsl](examples/binary_tree.tsl) | Binary tree |
| [hash_table.tsl](examples/hash_table.tsl) | Hash table |
| [graph.tsl](examples/graph.tsl) | Graph |

### Dynamic Programming

| Example | Description |
|---------|-------------|
| [knapsack.tsl](examples/knapsack.tsl) | 0/1 Knapsack |
| [lcs.tsl](examples/lcs.tsl) | Longest common subsequence |
| [coin_change.tsl](examples/coin_change.tsl) | Coin change |
| [edit_distance.tsl](examples/edit_distance.tsl) | Edit distance |
| [dijkstra.tsl](examples/dijkstra.tsl) | Dijkstra's algorithm |

### Traversal

| Example | Description |
|---------|-------------|
| [dfs.tsl](examples/dfs.tsl) | Depth-first search |
| [bfs.tsl](examples/bfs.tsl) | Breadth-first search |

---

## Tests

```bash
# Run all unit tests
npm test

# Run release test suite
cd release-test && node run-all-tests.js
```

**Test results:**

| Suite | Status |
|-------|--------|
| AST | ✓ Pass |
| Lexer | ✓ Pass |
| Parser (expressions + statements) | ✓ Pass |
| Validator | ✓ Pass |
| Generator | ✓ Pass |
| Variable Semantics | ✓ Pass |
| Integration | ✓ Pass |
| CLI | ✓ Pass |

---

## Project Structure

```
tsl/
├── src/
│   ├── cli.js        # Command-line interface
│   ├── compiler.js   # Main compiler orchestrator
│   ├── lexer.js      # Tokenizer
│   ├── parser.js     # Expression & statement parser
│   ├── ast.js        # AST node definitions
│   ├── validator.js  # Semantic validation
│   ├── generator.js  # JavaScript code generation
│   └── errors.js     # Error types
├── examples/         # 100+ TSL examples
├── tests/            # Unit & integration tests
│   ├── ast/
│   ├── cli/
│   ├── generator/
│   ├── integration/
│   ├── lexer/
│   ├── parser/
│   └── validator/
├── docs/             # Documentation
├── release-test/     # Standalone release verification
└── README.md         # This file
```

---

## License

GPL-3.0
