'use strict';

class GeneratorError extends Error {
  constructor(message, line, column, filename) {
    super(message);
    this.name = 'GeneratorError';
    this.line = line;
    this.column = column;
    this.filename = filename;
  }
}

function createGenerator(filename = '<anonymous>') {
  let indentLevel = 0;
  let declaredVars = new Set();
  let inFunction = false;

  function reset() {
    indentLevel = 0;
    declaredVars = new Set();
    inFunction = false;
  }

  function indent() {
    return '  '.repeat(indentLevel);
  }

  function generateNode(node) {
    if (!node || !node.type) {
      return '';
    }

    const generator = {
      Program: generateProgram,
      NumberLiteral: generateNumberLiteral,
      StringLiteral: generateStringLiteral,
      BooleanLiteral: generateBooleanLiteral,
      NullLiteral: generateNullLiteral,
      Identifier: generateIdentifier,
      BinaryExpression: generateBinaryExpression,
      UnaryExpression: generateUnaryExpression,
      CallExpression: generateCallExpression,
      ArrayExpression: generateArrayExpression,
      ObjectExpression: generateObjectExpression,
      Property: generateProperty,
      MemberExpression: generateMemberExpression,
      ArrayAccess: generateArrayAccess,
      Assignment: generateAssignment,
      IfStatement: generateIfStatement,
      WhileStatement: generateWhileStatement,
      ForStatement: generateForStatement,
      FunctionDeclaration: generateFunctionDeclaration,
      ReturnStatement: generateReturnStatement,
      BreakStatement: generateBreakStatement,
      ContinueStatement: generateContinueStatement,
      ExpressionStatement: generateExpressionStatement,
    };

    const gen = generator[node.type];
    if (!gen) {
      throw new GeneratorError(
        `Unknown node type: ${node.type}`,
        node.location?.line,
        node.location?.column,
        filename
      );
    }

    return gen(node);
  }

  function generateProgram(node) {
    reset();
    const lines = [];
    for (const stmt of node.body) {
      const code = generateStatement(stmt);
      if (code) lines.push(code);
    }
    return lines.join('\n') + '\n';
  }

  function generateStatement(stmt) {
    if (!stmt || !stmt.type) return '';
    if (stmt.type === 'ExpressionStatement') {
      return generateExpressionStatement(stmt);
    }
    const code = generateNode(stmt);
    return code;
  }

  // === Literals ===

  function generateNumberLiteral(node) {
    return String(node.value);
  }

  function generateStringLiteral(node) {
    return JSON.stringify(node.value);
  }

  function generateBooleanLiteral(node) {
    return node.value ? 'true' : 'false';
  }

  function generateNullLiteral() {
    return 'null';
  }

  // === Identifier ===

  function generateIdentifier(node) {
    return node.name;
  }

  // === Member Expression ===

  function generateMemberExpression(node) {
    const obj = generateNode(node.object);
    const prop = generateNode(node.property);
    return `${obj}.${prop}`;
  }

  // === Array Access ===

  function generateArrayAccess(node) {
    const obj = generateNode(node.object);
    const idx = generateNode(node.index);
    return `${obj}[${idx}]`;
  }

  // === Binary Expression ===

  function generateBinaryExpression(node) {
    const left = generateNode(node.left);
    const right = generateNode(node.right);
    return `(${left} ${node.operator} ${right})`;
  }

  // === Unary Expression ===

  function generateUnaryExpression(node) {
    const arg = generateNode(node.argument);
    return `(${node.operator} ${arg})`;
  }

  // === Call Expression ===

  function generateCallExpression(node) {
    const callee = generateNode(node.callee);
    const args = node.arguments.map(arg => generateNode(arg)).join(', ');
    return `${callee}(${args})`;
  }

  // === Array Expression ===

  function generateArrayExpression(node) {
    const elements = node.elements.map(el => generateNode(el));
    return `[${elements.join(', ')}]`;
  }

  // === Object Expression ===

  function generateObjectExpression(node) {
    const props = node.properties.map(prop => generateNode(prop));
    return `{ ${props.join(', ')} }`;
  }

  function generateProperty(node) {
    const key = generateNode(node.key);
    const value = generateNode(node.value);
    return `${key}: ${value}`;
  }

  // === Assignment ===

  function generateAssignment(node) {
    const left = generateNode(node.left);
    const right = generateNode(node.right);

    // Determine if this is a member access assignment (e.g., player.x = 100)
    if (node.left.type === 'MemberExpression') {
      return `${indent()}${left} = ${right};`;
    }

    // Check if variable was already declared in this scope
    const varName = node.left.name;
    const isDeclaration = !declaredVars.has(varName);

    if (isDeclaration) {
      declaredVars.add(varName);
      return `${indent()}let ${left} = ${right};`;
    }

    return `${indent()}${left} = ${right};`;
  }

  // === If Statement ===

  function generateIfStatement(node) {
    const condition = generateNode(node.condition);
    const lines = [];

    lines.push(`${indent()}if (${condition}) {`);
    indentLevel++;
    for (const stmt of node.consequent) {
      lines.push(generateStatement(stmt));
    }
    indentLevel--;

    if (node.alternate) {
      lines.push(`${indent()}} else {`);
      indentLevel++;
      for (const stmt of node.alternate) {
        lines.push(generateStatement(stmt));
      }
      indentLevel--;
      lines.push(`${indent()}}`);
    } else {
      lines.push(`${indent()}}`);
    }

    return lines.join('\n');
  }

  // === While Statement ===

  function generateWhileStatement(node) {
    const condition = generateNode(node.condition);
    const lines = [];

    lines.push(`${indent()}while (${condition}) {`);
    indentLevel++;
    for (const stmt of node.body) {
      lines.push(generateStatement(stmt));
    }
    indentLevel--;

    lines.push(`${indent()}}`);

    return lines.join('\n');
  }

  // === For Statement ===

  function generateForStatement(node) {
    const variable = generateNode(node.variable);
    const iterable = generateNode(node.iterable);
    const lines = [];

    lines.push(`${indent()}for (let ${variable} of ${iterable}) {`);
    indentLevel++;
    for (const stmt of node.body) {
      lines.push(generateStatement(stmt));
    }
    indentLevel--;

    lines.push(`${indent()}}`);

    return lines.join('\n');
  }

  // === Function Declaration ===

  function generateFunctionDeclaration(node) {
    const params = node.parameters.map(p => p.name).join(', ');
    const lines = [];

    lines.push(`${indent()}function ${node.name.name}(${params}) {`);
    const prevInFunction = inFunction;
    inFunction = true;
    const prevDeclaredVars = declaredVars;
    const newDeclaredVars = new Set(node.parameters.map(p => p.name));
    declaredVars = newDeclaredVars;
    const prevIndentLevel = indentLevel;
    indentLevel++;

    for (const stmt of node.body) {
      lines.push(generateStatement(stmt));
    }

    inFunction = prevInFunction;
    declaredVars = prevDeclaredVars;
    indentLevel = prevIndentLevel;

    lines.push(`${indent()}}`);

    return lines.join('\n');
  }

  // === Return Statement ===

  function generateReturnStatement(node) {
    const arg = node.argument ? generateNode(node.argument) : '';
    return `${indent()}return ${arg};`;
  }

  // === Break Statement ===

  function generateBreakStatement() {
    return `${indent()}break;`;
  }

  // === Continue Statement ===

  function generateContinueStatement() {
    return `${indent()}continue;`;
  }

  // === Expression Statement ===

  function generateExpressionStatement(node) {
    const expr = generateNode(node.expression);
    return `${indent()}${expr};`;
  }

  function generate(source) {
    reset();
    return generateProgram(source);
  }

  return { generate };
}

module.exports = {
  GeneratorError,
  createGenerator,
};
