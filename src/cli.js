#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { tokenize } = require('./lexer');
const { createParser } = require('./parser');
const { createValidator } = require('./validator');
const { createGenerator } = require('./generator');
const { Program } = require('./ast');

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: tsl <file.tsl>');
    process.exit(1);
  }

  const file = args[0];
  const ext = path.extname(file);

  if (ext !== '.tsl') {
    console.error(`Error: Expected .tsl extension, got "${ext}"`);
    process.exit(1);
  }

  if (!fs.existsSync(file)) {
    console.error(`Error: File not found: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf-8');
  const filename = path.basename(file);

  try {
    // Lex
    const tokens = tokenize(source, filename);

    // Parse
    const parser = createParser(tokens, source, filename);
    const body = parser.parseStatements();
    const ast = Program(body, { line: 1, column: 0, endLine: 1, endColumn: 0 });

    // Validate
    const validator = createValidator(source, filename);
    validator.validate(ast);

    // Generate
    const generator = createGenerator(source, filename);
    const jsCode = generator.generate(ast);

    console.log(`Loaded: ${filename}`);
    console.log('Compilation successful!');
    console.log('');
    console.log('--- Generated JavaScript ---');
    console.log(jsCode);
    console.log('--- End of Generated Code ---');

  } catch (err) {
    if (err && typeof err.toString === 'function') {
      console.error(err.toString());
    } else {
      console.error('Unknown error:', err);
    }
    process.exit(1);
  }
}

main();
