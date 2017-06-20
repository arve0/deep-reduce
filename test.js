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

reduced = dr({
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
}, (reduced, value, path) => {
  if (path.match(/packages\.\d+\.contents\.\d+$/)) {
    reduced.push(value)
  }
  return reduced
}, [])

assert.deepEqual(reduced, [
  { id: 'R88', name: 'resistor' },
  { id: 'C99', name: 'capacitor' },
  { id: 'C96', name: 'coil' }])

// test performance
let obj = require('./MAT1-04.json')
let start = Date.now()
dr(obj, reduced => reduced)  // noop
let end = Date.now()
console.log(`Traversed MAT1-04.json (149kb) in ${end - start} milliseconds.`)

start = Date.now()
reduced = dr(obj, (reduced, value, path) =>
  path.match(/kompetansemaal\.\d+$/)  // get all items of kompetansemaal arrays
    ? reduced.push(value) && reduced
    : reduced, [])
end = Date.now()
console.log(`Traversed MAT1-04.json (149kb) and got ${reduced.length} objects in ${end - start} milliseconds.`)

start = Date.now()
reduced = dr(obj, (reduced, value, path) =>
  path.match(/kompetansemaal\.\d+$/)  // get all items of kompetansemaal arrays
    ? reduced.push(value) && reduced
    : reduced, [], 'kompetansemaal-kapittel.kompetansemaalsett')
end = Date.now()
console.log(`Traversed kompetansemaal-kapittel.kompetansemaalsett in MAT1-04.json and got ${reduced.length} objects in ${end - start} milliseconds.`)
