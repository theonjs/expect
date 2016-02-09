const should = require('should') // eslint-disable-line
const assertions = require('../../lib/assertions')

describe('fn()', function () {
  it('should assert response status', function () {
    const assert = res => res.status === 200
    should.equal(assertions.fn(assert, { status: 200 }), undefined)
  })

  it('should not assert the response', function () {
    const assert = res => {
      if (res.status !== 200) {
        throw new Error('invalid status')
      }
    }
    should.equal(assertions.fn(assert, { status: 202 }).message, 'invalid status')
  })
})
