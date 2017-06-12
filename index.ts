
interface ReducerFunction {
  (reduced: any, value: any, path: string, obj: object): any
}

  function deepReduce (obj: any, reducer: ReducerFunction, reduced = {}, path = '', thisArg = {}): any {
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
