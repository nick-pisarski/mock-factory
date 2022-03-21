export type RecPartial<T> = { [P in keyof T]?: RecPartial<T[P]> };

export function uniq<T>(ts: Array<T>): Array<T> {
  const out: T[] = [];
  for (const v of ts) {
    if (out.indexOf(v) < 0) {
      out.push(v);
    }
  }
  return out;
}

export function recursivePartialOverride<U>(x: U, y: RecPartial<U>): U {
  if (y === undefined || y === null) return x;

  const objProto = Object.getPrototypeOf({});
  if (Object.getPrototypeOf(y) != objProto) return y as any;

  let v = Object.assign({}, x);
  let yKeys = Object.keys(y);
  const allKeys = uniq(Object.keys(v).concat(yKeys));
  for (const key of allKeys) {
    if (yKeys.indexOf(key) >= 0) {
      const itemKeyVal = (y as any)[key];
      if (null != itemKeyVal && typeof itemKeyVal === "object") {
        const baseKeyVal = (v as any)[key];
        (v as any)[key] = recursivePartialOverride(baseKeyVal, itemKeyVal);
      } else {
        (v as any)[key] = itemKeyVal;
      }
    }
  }
  return v;
}
