/**
 * Reduce objects deeply, like Array.prototype.reduce but for objects.
 *
 * @param obj Object to traverse.
 * @param reducer Reducer function.
 * @param reduced Initial accumulated value.
 * @param path Root of traversal.
 * @param thisArg Binds `thisArg` as `this` on `reducer`.
 * @returns Accumulated value.
 */
declare function deepReduce(obj: any, reducer: (reduced: any, value: any, path: string, root: object) => any, reduced?: {}, path?: string, thisArg?: {}): any;
export = deepReduce;
