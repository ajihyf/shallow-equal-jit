import { shallowEqualJIT, ShallowEqual } from '../src';

describe('shallowEqualJIT', () => {
  test('shallowEqual', () => {
    const shallowEqual = shallowEqualJIT(['a', 'b']);
    expect(shallowEqual({ a: 20, b: 20 }, { a: 20, b: 20 })).toBe(true);
    expect(shallowEqual({ a: NaN, b: 20 }, { a: NaN, b: 20 })).toBe(true);
    expect(shallowEqual({ a: 20, b: 20 }, { a: 20, b: 30 })).toBe(false);

    expect(
      // @ts-expect-error
      shallowEqual({ a: 20, b: 20, d: 50 }, { a: 20, b: 20 })
    ).toBe(true);

    expect(
      // @ts-expect-error
      shallowEqual({ a: 20, b: 20 }, { a: 20, b: 20, d: 50 })
    ).toBe(true);
  });

  test('shallowEqual array', () => {
    const shallowEqual = shallowEqualJIT([0, 1]);
    expect(shallowEqual([0, 1], [0, 1])).toBe(true);
    expect(shallowEqual([0, 1], [0, 2])).toBe(false);

    expect(
      // @ts-expect-error
      shallowEqual({ a: 20, b: 20, d: 50 }, [0, 1])
    ).toBe(false);
  });

  test('with no keys', () => {
    const shallowEqual = shallowEqualJIT([]);

    expect(shallowEqual({ a: 20, b: 20 }, { a: 20, b: 20 })).toBe(true);
    expect(shallowEqual({ a: 20, b: 20 }, {})).toBe(true);
  });

  test('using strict eq', () => {
    const shallowEqual = shallowEqualJIT(['a', 'b'], true);

    expect(shallowEqual({ a: NaN, b: 20 }, { a: NaN, b: 20 })).toBe(false);
  });

  test('typing', () => {
    type Comp<P> = (prop: P) => string;
    type Props = {
      a: number;
      b?: string;
      c: number;
    };

    const CompA: Comp<Props> = ({ a, b = 'b', c }) => {
      return String(a) + b + String(c);
    };

    function memo<P>(comp: Comp<P>, _isEqual: ShallowEqual<P>) {
      return comp;
    }

    memo(CompA, shallowEqualJIT(['a', 'b']));
    memo(CompA, shallowEqualJIT(['a', 'b', 'c']));

    // @ts-expect-error
    memo(CompA, shallowEqualJIT(['a', 'd']));
  });
});
