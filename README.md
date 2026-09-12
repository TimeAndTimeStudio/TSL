# TSL Language & JavaScript Transpiler

TSL คือภาษาโปรแกรมขนาดเล็กที่ compile/transpile เป็น JavaScript

## Usage

```bash
node src/cli.js <file.tsl>
```

## Status

Phase 10 — Variable Semantics

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
Variable Semantics ← Current Phase
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
| 7 | JS Generator Core | Done |
| 8 | Control Flow Generator | ✓ Done |
| 9 | Function Generator | ✓ Done |
| 10 | Variable Semantics | ✓ Done |
| 11 | Data Types | Pending |
| 12 | Runtime | Pending |
| 13 | Math | Pending |
| 14 | Engine API | Pending |
| 15 | Render Loop | Pending |
| 16 | Error System | Pending |
| 17 | CLI | Pending |
| 18 | Integration | Pending |
| 19 | Specification Lock | Pending |
| 20 | Test & Release Candidate | Pending |
| 21 | Documentation | Pending |
| 22 | TSL v1.0 | Pending |
