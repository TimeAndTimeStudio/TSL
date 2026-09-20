/*
    TSL (Time and Time Studio Language)
    Copyright (C) 2026 Time And Time Studio

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

const ErrorType = {
  LEXER: 'Lexer Error',
  PARSER: 'Parser Error',
  SEMANTIC: 'Semantic Error',
  GENERATOR: 'Generator Error',
};

class TSL extends Error {
  constructor(errorType, message, filename, line, column, sourceLine) {
    super(message);
    this.errorType = errorType;
    this.filename = filename;
    this.line = line;
    this.column = column;
    this.sourceLine = sourceLine;
    this.stack = new Error(message).stack;
  }
}

class LexerError extends TSL {
  constructor(message, filename, line, column, sourceLine) {
    super(ErrorType.LEXER, message, filename, line, column, sourceLine);
    this.name = 'LexerError';
  }
}

class ParserError extends TSL {
  constructor(message, filename, line, column, sourceLine) {
    super(ErrorType.PARSER, message, filename, line, column, sourceLine);
    this.name = 'ParserError';
  }
}

class ValidationError extends TSL {
  constructor(message, filename, line, column, sourceLine) {
    super(ErrorType.SEMANTIC, message, filename, line, column, sourceLine);
    this.name = 'ValidationError';
  }
}

class GeneratorError extends TSL {
  constructor(message, filename, line, column, sourceLine) {
    super(ErrorType.GENERATOR, message, filename, line, column, sourceLine);
    this.name = 'GeneratorError';
  }
}

function getSourceLine(source, lineNum) {
  const lines = source.split('\n');
  if (lineNum >= 1 && lineNum <= lines.length) {
    return lines[lineNum - 1];
  }
  return '';
}

module.exports = {
  ErrorType,
  TSL,
  LexerError,
  ParserError,
  ValidationError,
  GeneratorError,
  getSourceLine,
};