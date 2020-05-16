# shallow-equal-jit

[![npm](https://img.shields.io/npm/v/shallow-equal-jit.svg)](https://www.npmjs.com/package/shallow-equal-jit)
[![Actions Status](https://github.com/ajihyf/shallow-equal-jit/workflows/CI/badge.svg)](https://github.com/ajihyf/shallow-equal-jit/actions)

Fast shallow equal with Just-In-Time compiled compare functions.

## Installation

```bash
npm install shallow-equal-jit --save
# or
yarn add shallow-equal-jit
```

## Usage

```ts
import { shallowEqualJIT } from 'shallow-equal-jit';

// generate equal function
const shallowEqual = shallowEqualJIT(['a', 'b']);

console.log(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
// keys except for a and b are ignored
console.log(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })); // true

console.log(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 })); // false
```

By default, this library uses `Object.is` for comparison, you can pass a second argument as `true` to use `===` operator.

```ts
const shallowEqualUsingStrictEq = shallowEqualJIT(['a', 'b'], true);
```

## Benchmark

The following results were produced under Node v12.16.3 on a MacBook Pro (Early 2015) 2.7 GHz Intel Core i5.

```
shallowequal (object, equal) x 3,273,287 ops/sec ±1.30% (91 runs sampled)
shallowequal (object, same) x 831,562,263 ops/sec ±1.91% (87 runs sampled)
shallowequal (object, unequal) x 5,090,021 ops/sec ±0.88% (84 runs sampled)

is-equal-shallow (object, equal) x 4,010,229 ops/sec ±0.36% (89 runs sampled)
is-equal-shallow (object, same) x 12,001,915 ops/sec ±0.47% (87 runs sampled)
is-equal-shallow (object, unequal) x 7,006,307 ops/sec ±0.27% (91 runs sampled)

shallow-equals (object, equal) x 7,306,243 ops/sec ±1.32% (91 runs sampled)
shallow-equals (object, same) x 21,384,443 ops/sec ±0.18% (91 runs sampled)
shallow-equals (object, unequal) x 12,936,562 ops/sec ±1.07% (90 runs sampled)

fbjs/lib/shallowEqual (object, equal) x 3,025,569 ops/sec ±0.18% (93 runs sampled)
fbjs/lib/shallowEqual (object, same) x 826,443,739 ops/sec ±1.03% (88 runs sampled)
fbjs/lib/shallowEqual (object, unequal) x 4,535,318 ops/sec ±0.19% (90 runs sampled)

fast-equals.shallowEqual (object, equal) x 3,080,743 ops/sec ±0.22% (91 runs sampled)
fast-equals.shallowEqual (object, same) x 830,713,756 ops/sec ±0.91% (90 runs sampled)
fast-equals.shallowEqual (object, unequal) x 4,740,245 ops/sec ±0.98% (91 runs sampled)

fast-shallow-equal (object, equal) x 3,129,008 ops/sec ±0.42% (88 runs sampled)
fast-shallow-equal (object, same) x 841,791,886 ops/sec ±0.83% (89 runs sampled)
fast-shallow-equal (object, unequal) x 4,513,256 ops/sec ±0.39% (93 runs sampled)

@wordpress/is-shallow-equal (object, equal) x 4,353,487 ops/sec ±0.37% (91 runs sampled)
@wordpress/is-shallow-equal (object, same) x 206,089,794 ops/sec ±0.28% (90 runs sampled)
@wordpress/is-shallow-equal (object, unequal) x 6,674,242 ops/sec ±0.31% (88 runs sampled)

shallow-equal-jit (object, equal) x 836,387,131 ops/sec ±0.83% (89 runs sampled)
shallow-equal-jit (object, same) x 836,515,680 ops/sec ±0.94% (89 runs sampled)
shallow-equal-jit (object, unequal) x 828,178,623 ops/sec ±1.03% (87 runs sampled)

shallow-equal-jit (===) (object, equal) x 832,237,483 ops/sec ±1.08% (87 runs sampled)
shallow-equal-jit (===) (object, same) x 838,105,210 ops/sec ±0.96% (88 runs sampled)
shallow-equal-jit (===) (object, unequal) x 843,725,200 ops/sec ±0.76% (91 runs sampled)
```
