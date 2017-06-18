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
function deepReduce(
  obj: any,
  reducer: (reduced: any, value: any, path: string, root: object) => any,
  reduced = {},
  path = '',
  thisArg = {}
): any {
  let pathArr = path === '' ? [] : path.split('.')
  let root = obj  // keep value of root object, for recursion

  if (pathArr.length) {
    // called with path, traverse to that path
    for (let key of pathArr) {
      obj = obj[key]
      if (obj === undefined) {
        throw new Error(`Path ${path} not found in object.`)
      }
    }
  }

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }

    pathArr.push(key)
    path = pathArr.join('.')
    let value = obj[key]
    reduced = reducer.call(thisArg, reduced, value, path, root)

    if (typeof value === 'object') {
      reduced = deepReduce(root, reducer, reduced, path, thisArg)
    }

    pathArr.pop()
  }
  return reduced
}
export = deepReduce
