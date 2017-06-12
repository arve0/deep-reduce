let dr = require('./')
let assert = require('assert')

let reduced = dr({
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
}, (reduced, value, path) => {
  if (typeof value === 'string') {
    reduced[path] = value
  }
  return reduced
})

assert.deepEqual(reduced, {
  a: 'a',
  'b.c': 'b.c',
  'c.0': 'c.0',
  'c.1.d': 'c.1.d',
  'c.1.e.0': 'c.1.e.0'
})
