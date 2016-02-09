const should = require('should') // eslint-disable-line
const assertions = require('../../lib/assertions')

describe('header()', function () {
  it('should match header by string', function () {
    const expectation = { name: 'content-type', value: 'foo/bar' }
    const res = { headers: { 'content-type': 'foo/bar' } }
    should.equal(assertions.header(expectation, res), undefined)
  })

  it('should match header by regexp', function () {
    const expectation = { name: 'content-type', value: /bar/i }
    const res = { headers: { 'content-type': 'foo/bar' } }
    should.equal(assertions.header(expectation, res), undefined)
  })

  it('should not match header', function () {
    const expectation = { name: 'content-type', value: 'bar/foo' }
    const res = { headers: { 'content-type': 'foo/bar' } }
    assertions.header(expectation, res).message.should.equal('expected "content-type" of "bar/foo", got "foo/bar"')
  })

  it('should not match a missing header', function () {
    const expectation = { name: 'foo', value: 'bar/foo' }
    const res = { headers: { 'bar': 'bar' } }
    assertions.header(expectation, res).message.should.equal('expected "foo" header field')
  })
})
