const expect = require('..')
// const should = require('should')
const theon = expect(require('theon'))

describe('expect', function () {
  it.skip('should be supported', function (done) {
    const api = theon('http://localhost')
      .resource('foo')
      .render()
    api.foo().end(done)
  })
})
