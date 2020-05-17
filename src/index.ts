export type ShallowEqual<T> = (prev: T, next: T) => boolean;

export function shallowEqualJIT<T extends object>(
  keys: Array<string & keyof T>,
  useStrictEq?: boolean
): ShallowEqual<T>;
export function shallowEqualJIT(
  keys: [],
  useStrictEq?: boolean
): ShallowEqual<any>;
export function shallowEqualJIT(
  keys: number[],
  useStrictEq?: boolean
): ShallowEqual<Array<any>>;
export function shallowEqualJIT(keys: any[], useStrictEq = false): Function {
  const equal = (prev: string, next: string) =>
    useStrictEq ? `${prev} === ${next}` : `Object.is(${prev}, ${next})`;

  // eslint-disable-next-line no-new-func
  return new Function(
    'prev',
    'next',
    'return ' +
      (keys.length > 0
        ? `${equal('prev', 'next')} || (` +
          keys
            .map(k => {
              k = typeof k === 'number' ? k : JSON.stringify(k);
              return equal(`prev[${k}]`, `next[${k}]`);
            })
            .join(' && ') +
          ')'
        : 'true') +
      ';'
  );
}
