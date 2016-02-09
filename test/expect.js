const nock = require('nock')
const expect = require('..')
const theon = expect(require('theon'))

describe('expect', function () {
  it('should assert the response', function (done) {
    nock('http://localhost')
      .get('/foo')
      .reply(200, { foo: 'bar' })

    const api = theon('http://localhost')
      .resource('foo')
      .path('/foo')
      .render()

    api.foo()
      .expect(200)
      .expect('Content-Type', /json/i)
      .expect({ foo: 'bar' })
      .end(done)
  })
})
