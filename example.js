const nock = require('nock')
const expect = require('./')
const theon = expect(require('theon'))

// Set up mock
nock('http://my.api.com')
  .get('/api/users/123')
  .set('Content-Type', 'application/json')
  .reply(200, [{
    id: '123',
    username: 'foo'
  }])

const client = theon('http://my.api.com')

const users = client
  .basePath('/api')
  .set('Version', '1.0')
  .collection('users')
  .basePath('/users')
  .resource('get')
  .path('/:id')

// Render the API client
const api = users.render()

api
  .users
  .get()
  .param('id', 123)
  // Attach an observer for the current request at API client level
  .expect(200)
  .expect('Content-Type', 'application/json')
  .expect([{ id: '123', username: 'foo' }])
  .expect(res => {
    if (res.error) {
      throw new Error('Invalid request')
    }
  })
  .end((err, res) => {
    if (err) {
      return console.error('Expectation failed:', err)
    }
    console.log('Success!')
  })
