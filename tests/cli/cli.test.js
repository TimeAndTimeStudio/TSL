'use strict';

const { execSync } = require('child_process');
const { writeFileSync, unlinkSync } = require('fs');
const { strictEqual, ok } = require('assert');

function run(args) {
  try {
    const result = execSync(`node ${__dirname}/../../src/cli.js ${args}`, {
      encoding: 'utf-8',
      cwd: __dirname + '/..',
    });
    return { exitCode: 0, stdout: result, stderr: '' };
  } catch (err) {
    return { exitCode: err.status || 1, stdout: err.stdout || '', stderr: err.stderr || '' };
  }
}

function writeTempTsl(content) {
  const tmp = `/tmp/test_${Date.now()}.tsl`;
  writeFileSync(tmp, content, 'utf-8');
  return tmp;
}

function cleanup(path) {
  try { unlinkSync(path); } catch {}
}

// Test 1: no args
{
  const r = run('');
  strictEqual(r.exitCode, 1);
  ok(r.stderr.includes('Usage'), 'Should show usage');
  console.log('PASS: no args');
}

// Test 2: wrong extension
{
  const tmp = `/tmp/test_wrong_${Date.now()}.txt`;
  writeFileSync(tmp, 'hello', 'utf-8');
  const r = run(tmp);
  cleanup(tmp);
  strictEqual(r.exitCode, 1);
  ok(r.stderr.includes('.tsl'), 'Should require .tsl extension');
  console.log('PASS: wrong extension');
}

// Test 3: file not found
{
  const r = run('/tmp/nonexistent_file.tsl');
  strictEqual(r.exitCode, 1);
  ok(r.stderr.includes('not found'), 'Should report file not found');
  console.log('PASS: file not found');
}

// Test 4: valid .tsl file
{
  const tmp = writeTempTsl('# test\nprint("hello")\n');
  const r = run(tmp);
  cleanup(tmp);
  strictEqual(r.exitCode, 0);
  ok(r.stdout.includes('Loaded'), 'Should report loaded');
  console.log('PASS: valid .tsl file');
}

console.log('\nAll CLI tests passed');
