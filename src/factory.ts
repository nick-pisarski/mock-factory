import { RecPartial, recursivePartialOverride } from "./shared";

export class Factory<T, K extends keyof T = keyof T> {
  base: T;
  sequence: number = 0;

  constructor(initial: T) {
    this.base = initial;
  }

  build(item?: RecPartial<T> & Omit<T, K>): T {
    this.sequence++;

    let v = Object.assign({}, this.base) as T;
    if (item) {
      v = recursivePartialOverride(v, item);
    }
    return v;
  }
}

export function makeFactory<T>(initial: T): Factory<T, keyof T> {
  return new Factory<T, keyof T>(initial);
}
