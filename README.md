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

Phase 17 — CLI

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
    ↓
Runtime
    ↓
CLI ← Current Phase
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
| 18 | Integration | Pending |
| 19 | Specification Lock | Pending |
| 20 | Test & Release Candidate | Pending |
| 21 | Documentation | Pending |
| 22 | TSL v1.0 | Pending |
