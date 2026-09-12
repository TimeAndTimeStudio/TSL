# TSL CLI

Command-line interface for the TSL Language compiler.

## Quick Start

```bash
node src/cli.js <file.tsl>
```

## Commands

### Run and View Generated JavaScript

Compile a `.tsl` file and display the generated JavaScript.

```bash
node src/cli.js <file.tsl>
```

**Output on success:**

```
Loaded: <file.tsl>
Compilation successful!

--- Generated JavaScript ---
<generated JS code>
--- End of Generated Code ---
```

**Output on error:**

```
Error message from compiler
```

Exit code 1 on error.

---

### Build to stdout

Compile and output the generated JavaScript to stdout.

```bash
node src/cli.js build <file.tsl>
```

**Output on success:**

```
<generated JS code>
```

---

### Build to output file

Compile and write the generated JavaScript to a file.

```bash
node src/cli.js build <file.tsl> -o <output.js>
```

**Output on success:**

```
Built: <file.tsl> -> <output.js>
```

---

### Check / Validate

Check a `.tsl` file for compilation errors without generating output.

```bash
node src/cli.js check <file.tsl>
```

**Output on success:**

```
Check passed: <file.tsl>
```

Exit code 0 on success, 1 on error.

---

### Show Version

Display the TSL compiler version.

```bash
node src/cli.js --version
```

**Output:**

```
TSL v1.0.0
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error |

---

## Error Messages

### Wrong file extension

```
Error: Expected .tsl extension, got "<ext>"
```

The input file must have a `.tsl` extension.

### File not found

```
Error: File not found: <file>
```

The specified file does not exist.

### Compiler errors

Compiler errors include:

- filename
- line number
- column number
- message
- source context

---

## Global Installation

Install globally:

```bash
npm install -g .
```

Use the `tsl` command:

```bash
tsl <file.tsl>
tsl build <file.tsl> -o <output.js>
tsl check <file.tsl>
tsl --version
```

---

## Usage Summary

```
tsl <file.tsl>
tsl build <file.tsl> [-o <output.js>]
tsl check <file.tsl>
tsl --version
```
