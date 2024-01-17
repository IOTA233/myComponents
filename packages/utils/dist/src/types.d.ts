export { isArray, isFunction, isObject, isString, isDate, isPromise, isSymbol, } from '@vue/shared';
export { isVNode } from 'vue';
export declare const isUndefined: (val: any) => val is undefined;
export declare const isBoolean: (val: any) => val is boolean;
export declare const isNumber: (val: any) => val is number;
export declare function isEmpty(val: unknown): boolean;
export declare function isElement(e: unknown): e is Element;
export declare function isPropAbsent(prop: unknown): prop is null | undefined;
export declare function isStringNumber(val: string): boolean;
