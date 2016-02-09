const should = require('should') // eslint-disable-line
const assertions = require('../../lib/assertions')

describe('body()', function () {
  it('should assert body string', function () {
    should.equal(assertions.body('foo bar', { body: 'foo bar' }), undefined)
  })

  it('should assert body as regexp', function () {
    should.equal(assertions.body(/foo/, { body: 'foo bar' }), undefined)
  })

  it('should assert body as JSON', function () {
    should.equal(assertions.body({ foo: 'bar' }, { body: { foo: 'bar' } }), undefined)
  })

  it('should not assert body', function () {
    should.equal(assertions.body('barfoo', { body: 'foobar' }).message, "expected 'barfoo' response body, got 'foobar'")
  })
})
