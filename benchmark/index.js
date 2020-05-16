// eslint-disable-next-line strict
'use strict';

const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

const beforeObject = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 };
const afterObjectSame = beforeObject;
const afterObjectEqual = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 };
const afterObjectUnequal = { a: 1, c: 3, e: 5, d: 5, b: 2, f: 'Unequal', g: 7 };

const keys = Object.keys(beforeObject);

[
  ['shallowequal', require('shallowequal')],
  ['is-equal-shallow', require('is-equal-shallow')],
  ['shallow-equals', require('shallow-equals')],
  ['fbjs/lib/shallowEqual', require('fbjs/lib/shallowEqual')],
  ['fast-equals.shallowEqual', require('fast-equals').shallowEqual],
  ['fast-shallow-equal', require('fast-shallow-equal').equal],
  ['@wordpress/is-shallow-equal', require('@wordpress/is-shallow-equal')],
  ['shallow-equal-jit', require('..').shallowEqualJIT(keys)],
  ['shallow-equal-jit (===)', require('..').shallowEqualJIT(keys, true)],
].forEach(([name, shallowEqual]) => {
  suite.add(name + ' (object, equal)', () => {
    shallowEqual(beforeObject, afterObjectEqual);
  });

  suite.add(name + ' (object, same)', () => {
    shallowEqual(beforeObject, afterObjectSame);
  });

  suite.add(name + ' (object, unequal)', () => {
    shallowEqual(beforeObject, afterObjectUnequal);
  });
});

suite
  .on('cycle', event => console.log(event.target.toString()))
  .run({ async: true });
