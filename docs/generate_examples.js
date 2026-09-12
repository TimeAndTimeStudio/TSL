const fs = require('fs');
const path = require('path');

const examplesDir = path.join(__dirname, '..', 'examples');
const outputFile = path.join(__dirname, '..', 'docs', 'examples.md');

const files = fs.readdirSync(examplesDir).filter(f => f.endsWith('.tsl')).sort();

const categories = {
  basic: [],
  controlFlow: [],
  functions: [],
  arrays: [],
  objects: [],
  advanced: []
};

const categoryPatterns = {
  basic: ['hello', 'variables', 'data-types', 'operators', 'comments', 'strings', 'numbers', 'booleans', 'null', 'expressions', 'complex', 'unary', 'floats', 'math', 'comparison', 'logical', 'reassignment', 'multi-statements', 'empty', 'no-return', 'member-access', 'string-len', 'string-compare', 'string-comparison', 'abs', 'power', 'squares', 'scores', 'fruits', 'calculator', 'nested'],
  controlFlow: ['if', 'while', 'for', 'break', 'continue', 'pass', 'nested-loops', 'nested-if', 'break-loop', 'continue-loop', 'while-break', 'while-counter', 'for-each', 'even-odd', 'min-max', 'find-max', 'count', 'search', 'swap', 'sum-digits', 'is-adult', 'days-in-month', 'roman'],
  functions: ['function', 'function-call', 'function-params', 'function-return', 'function-nested', 'function-recursive', 'function-args', 'function-scope', 'function-default', 'function-multiple', 'function-call-chain', 'function-complex', 'function-loop', 'function-if', 'function-all', 'function-array', 'function-object-param', 'function-return-array', 'function-chaining', 'function-guard'],
  arrays: ['array', 'array-access', 'array-assignment', 'array-nested', 'array-loops', 'array-of-objects', 'array-methods', 'array-mixed', 'array-empty', 'array-index', 'array-expression', 'array-nested-access', 'array-complex', 'array-loop-functions', 'array-object-functions'],
  objects: ['object', 'object-access', 'object-assignment', 'object-nested', 'object-functions', 'object-methods', 'object-loops', 'object-mixed', 'object-empty', 'object-index', 'object-expression', 'object-nested-access', 'object-complex', 'object-loop-functions', 'object-array-functions'],
  advanced: ['fibonacci', 'factorial', 'prime', 'palindrome', 'gcd', 'lcm', 'leap-year', 'binary-search', 'bubble-sort', 'merge-sort', 'quick-sort', 'linked-list', 'stack', 'queue', 'hash-table', 'binary-tree', 'graph', 'bfs', 'dfs', 'dijkstra', 'knapsack', 'coin-change', 'edit-distance', 'lcs', 'lis', 'matrix-chain', 'house-robber', 'palindrome-partition', 'word-break', 'trap-rain', 'class-like', 'closure', 'matrix', 'queue', 'stack', 'linked-list', 'hash-table', 'graph', 'bfs', 'dfs', 'dijkstra', 'simple-game', 'reverse', 'count', 'search', 'binary-search', 'bubble-sort', 'merge-sort', 'quick-sort', 'fibonacci-dp', 'knapsack-01', 'edit-distance', 'lcs', 'lis', 'matrix-chain', 'house-robber', 'palindrome-partition', 'word-break', 'trap-rain']
};

files.forEach(file => {
  const name = file.replace('.tsl', '').toLowerCase();
  let placed = false;
  
  for (const [cat, patterns] of Object.entries(categoryPatterns)) {
    if (patterns.some(p => name.includes(p))) {
      categories[cat].push(file);
      placed = true;
      break;
    }
  }
  
  if (!placed) {
    categories.advanced.push(file);
  }
});

function escapeMarkdown(code) {
  return code
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

function generateSection(heading, files) {
  if (files.length === 0) return '';
  
  let md = `\n## ${heading}\n\n`;
  
  files.forEach((file, idx) => {
    const content = fs.readFileSync(path.join(examplesDir, file), 'utf-8');
    const name = file.replace('.tsl', '').replace(/-/g, '_');
    const title = file.replace('.tsl', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    md += `### ${files.indexOf(file) + 1}. ${file} -- ${title}\n\n`;
    md += '```tsl\n';
    md += escapeMarkdown(content);
    if (!content.endsWith('\n')) md += '\n';
    md += '```\n\n';
  });
  
  return md;
}

let md = '# TSL Examples\n\n';
md += 'A collection of working TSL programs organized by feature category.\n\n';
md += 'All examples are in the `examples/` directory and transpile to valid JavaScript.\n\n';
md += '---\n\n';
md += '## Table of Contents\n\n';

const catNames = {
  basic: 'Basic',
  controlFlow: 'Control Flow',
  functions: 'Functions',
  arrays: 'Arrays',
  objects: 'Objects',
  advanced: 'Advanced'
};

for (const [key, name] of Object.entries(catNames)) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  md += `- [${name}](#${slug})\n`;
}

md += '\n---\n\n';

for (const [key, name] of Object.entries(catNames)) {
  md += generateSection(name, categories[key]);
}

fs.writeFileSync(outputFile, md, 'utf-8');
console.log(`Generated ${outputFile} with ${files.length} examples across ${Object.keys(categories).length} categories`);
