#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

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

  console.log(`Loaded: ${file} (${source.length} bytes)`);
  process.exit(0);
}

main();
