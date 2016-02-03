const should = require('should') // eslint-disable-line
const assertions = require('../../lib/assertions')

describe('status()', function () {
  it('should assert numbers', function () {
    should.equal(assertions.status(200, { status: 200 }), undefined)
    should.equal(assertions.status(500, { status: 500 }), undefined)
  })

  it('should return an error when assert fails', function () {
    assertions.status(200, { status: 201 }).should.match(/expect 200/i)
  })
})
