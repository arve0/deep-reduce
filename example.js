const deepReduce = require('deep-reduce')

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
