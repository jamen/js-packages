'use strict';

const guru = require('guru');
const common = require('../lib');

const Parser = guru.Parser;

const foo = new Parser(common.lexing.all);
foo.parse('0x12 ** 0b11011001').then(res => {
  console.log(res[0]);
}, err => console.trace(err));
