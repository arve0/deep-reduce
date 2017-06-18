"use strict";
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
function deepReduce(obj, reducer, reduced, path, thisArg) {
    if (reduced === void 0) { reduced = {}; }
    if (path === void 0) { path = ''; }
    if (thisArg === void 0) { thisArg = {}; }
    var pathArr = path === '' ? [] : path.split('.');
    var root = obj; // keep value of root object, for recursion
    if (pathArr.length) {
        // called with path, traverse to that path
        for (var _i = 0, pathArr_1 = pathArr; _i < pathArr_1.length; _i++) {
            var key = pathArr_1[_i];
            obj = obj[key];
            if (obj === undefined) {
                throw new Error("Path " + path + " not found in object.");
            }
        }
    }
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        pathArr.push(key);
        path = pathArr.join('.');
        var value = obj[key];
        reduced = reducer.call(thisArg, reduced, value, path, root);
        if (typeof value === 'object') {
            reduced = deepReduce(root, reducer, reduced, path, thisArg);
        }
        pathArr.pop();
    }
    return reduced;
}
module.exports = deepReduce;
