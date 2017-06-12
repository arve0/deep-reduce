[![Build Status](https://travis-ci.org/arve0/deep-reduce.svg?branch=master)](https://travis-ci.org/arve0/deep-reduce) [![npm version](https://badge.fury.io/js/deep-reduce.svg)](https://badge.fury.io/js/deep-reduce)
# deep-reduce
Reduce objects deeply, call reducer for every nested node in object tree. Use `deepReduce` for
transforming/getting values from awfully nested objects. `deepReduce` also traverse arrays.


## Install
```sh
npm i deep-reduce
```


## Usage
[Try example in browser](https://runkit.com/npm/deep-reduce).

```js
const deepReduce = require('deep-reduce')
const deepEqual = require('assert').deepEqual

// let nested leaf values be equal to their path, for demonstration purpose
let deepNestedObject = {
  a: 'a',
  b: { c: 'b.c' },
  c: [
    'c.0',
    {
      d: 'c.1.d',
      e: [
        'c.1.e.0'
      ]
    }
  ]
}

// store all values which are strings to reduced[path].
let flattenStrings = (reduced, value, path) => {
  if (typeof value === 'string') {
    reduced[path] = value
  }
  return reduced
}

// the reduced value is returned
let reduced = deepReduce(deepNestedObject, flattenStrings)

// we should now have this object
deepEqual(reduced, {
  'a': 'a',
  'b.c': 'b.c',
  'c.0': 'c.0',
  'c.1.d': 'c.1.d',
  'c.1.e.0': 'c.1.e.0'
})
```

Root object may be an array also:
```js
deepReduce([{a: 1},{b: 2},{a: 3}], (r,v) => typeof v === 'number' ? r + v : r, 0)
// 6
```


## API
`deepReduce` takes 5 arguments. 2 mandatory and 3 optional:

```ts
deepReduce (obj: object, reducer: ReducerFunction, reduced = {}, path = '', thisArg = {}): any
```

### Arguments
- `obj` Object to traverse.
- `reducer` Function to call with every value in `obj`-tree. See section below
  for [`reducer` function signature](#arguments-for-reducer-function).
- `reduced` Initial value of `reduced` passed to `reducer`. Defaults to empty object `{}`.
- `path` Path to root, start traversing here. Nice to omit looping through parts of `obj`.

  Example:
  ```js
  deepReduce({ a: [1,2,3], b: { c: [3, 3] } }, (reduced, val) => reduced + val, 1, 'b.c')
  // only traverses b.c, returns 1 + 3 + 3 = 7
  ```

- `thisArg` Bound to reducer as `this`.

### Arguments for reducer function
The reducer function is called with these arguments:

```ts
interface ReducerFunction {
  (reduced, value, path: string, obj: object): any
}
```

- `reduced` Initial or current reduced value.
- `value` Value of current node.
- `path` Path to current value.
- `obj` Root object passed to `deepReduce` as `obj`.

The `reducer` should return the `reduced` value.


## Performance
I have not given performance any thoughs. If you have any ideas, open an issue.


## Development
```sh
git clone https://github.com/arve0/deep-reduce
cd deep-reduce
npm start  # watches index.ts and builds on any change
npm test  # runs node test.js
```

## License
MIT © 2017 Arve Seljebu
