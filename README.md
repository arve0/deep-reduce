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

Here is how you would collect all items of nested arrays at some specific path:
```js
// we want to get contents from all packets
let transport = {
  id: 'A8811',
  packages: [
    {
      id: 'P100',
      contents: [
        {
          id: 'R88',
          name: 'resistor'
        },
        {
          id: 'C99',
          name: 'capacitor'
        }
      ]
    }, {
      id: 'P101',
      contents: [
        {
          id: 'C96',
          name: 'coil'
        }
      ]
    }
  ]
}

let contents = deepReduce(transport, (reduced, value, path) => {
  if (path.match(/packages\.\d+\.contents\.\d+$/)) {
    // path is packages.n.contents.m
    // item n in packages array
    // item m in contents array
    reduced.push(value)
  }
  return reduced
}, [])  // start with an empty array

// [ { id: 'R88', name: 'resistor' },
//   { id: 'C99', name: 'capacitor' },
//   { id: 'C96', name: 'coil' } ]
```


## API
`deepReduce` takes 5 arguments. 2 mandatory and 3 optional:

```ts
deepReduce (
  obj: object,
  reducer: (reduced: any, value: any, path: string, root: object) => any,
  reduced = {},
  path = '',
  thisArg = {}): any
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
(reduced: any, value: any, path: string, root: object) => any
```

- `reduced` Initial or current reduced value.
- `value` Value of current node.
- `path` Path to current value.
- `root` Root object passed to `deepReduce` as `obj`.

The `reducer` should return the `reduced` value.


## Performance
`deep-reduce` traverses every node of a 149 kb JSON in 10 milliseconds on a macbook air 2013 i5 1.3GHz, see [test.js](test.js#L68-L73).

You can omit traversal of parts of the object tree with defining a start `path`:

```js
deepReduce(object, reducer, initialValue, 'start.at.this.path')
```

...which may give some performance gains.


## Development
```sh
git clone https://github.com/arve0/deep-reduce
cd deep-reduce
npm start  # watches index.ts and builds on any change
npm test  # runs node test.js
```

## License
MIT © 2017 Arve Seljebu
