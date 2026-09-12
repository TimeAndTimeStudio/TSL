# TSL Language & JavaScript Transpiler

TSL คือภาษาโปรแกรมขนาดเล็กที่ compile/transpile เป็น JavaScript

## Usage

```bash
# Run and view generated JavaScript
node src/cli.js <file.tsl>

# Build to stdout
tsl build <file.tsl>

# Build to output file
tsl build <file.tsl> -o <output.js>

# Check/validate only
tsl check <file.tsl>

# Show version
tsl --version
```

## Status

TSL v1.0 — Complete

## Compiler Pipeline

```
TSL Source
    ↓
Lexer
    ↓
Tokens
    ↓
Parser
    ↓
AST
    ↓
Validator
    ↓
JavaScript Generator
    ↓
JavaScript
```

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | SPEC Foundation | ✓ Done |
| 1 | Skeleton | ✓ Done |
| 2 | Lexer | ✓ Done |
| 3 | AST | ✓ Done |
| 4 | Parser — Expressions | ✓ Done |
| 5 | Parser — Statements | ✓ Done |
| 6 | Validator | ✓ Done |
| 7 | JS Generator Core | ✓ Done |
| 8 | Control Flow Generator | ✓ Done |
| 9 | Function Generator | ✓ Done |
| 10 | Variable Semantics | ✓ Done |
| 11 | Data Types | ✓ Done |
| 12 | Runtime | ✓ Done |
| 13 | Math | ✓ Done |
| 14 | Engine API | ✓ Done |
| 15 | Render Loop | ✓ Done |
| 16 | Error System | ✓ Done |
| 17 | CLI | ✓ Done |
| 18 | Integration | ✓ Done |
| 19 | Specification Lock | ✓ Done |
| 20 | Test & Release Candidate | ✓ Done |
| 21 | Documentation | ✓ Done |
| 22 | TSL v1.0 | ✓ Done |

## Release Test Results

Standalone test project: `release-test/`

```
Clean Install:      ✓ PASS
Clean Build:        ✓ PASS (10/10 examples)
Lexer Tests:        ✓ PASS
Parser Tests:       ✓ PASS (expressions + statements)
Validator Tests:    ✓ PASS
Generator Tests:    ✓ PASS
Variable Semantics: ✓ PASS
AST Tests:          ✓ PASS
Integration Tests:  ✓ PASS
CLI Tests:          ✓ PASS

CLI Functionality:  ✓ PASS (version, build, check, -o flag)

Total: 24/24 release tests passed
```
