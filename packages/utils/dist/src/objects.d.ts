import type { Arrayable } from '.';
export declare const keysOf: <T>(arr: T) => (keyof T)[];
export declare const entriesOf: <T>(arr: T) => Entries<T>;
export { hasOwn } from '@vue/shared';
export declare function getProp<T = any>(obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any): {
    value: T;
};
