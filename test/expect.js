const expect = require('..')
const should = require('should')
const theon = require('theon')

describe('expect', function () {
  it('should be supported', function (done) {

    app.get('/', function (req, res) {
      res.send('hello')
    })

    var s = app.listen(function () {
      var url = 'http://localhost:' + s.address().port
      request(url)
        .get('/')
        .expect('hello', done)
    })
  })
})
