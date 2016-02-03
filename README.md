# theon-expect [![Build Status](https://travis-ci.org/theonjs/expect.svg?branch=master)](https://travis-ci.org/theonjs/expect) [![npm version](https://badge.fury.io/js/theon-expect.svg)](https://www.npmjs.com/package/theon-expect)

HTTP assertions made easy for [theon](http://github.com/h2non/theon) based API clients.

## About

The motivation with this module is to provide a high-level abstraction for testing
HTTP, while still allowing you to drop down to the lower-level API provided by super-agent.

## Features

- Easy to use from any theon based API client
- Dead simple declarative API
- HTTP status code expectation
- HTTP headers expections
- Response bodies comparison supporting deep assertions
- Custom function expectations
- Build-in promises support

## Installation

```bash
npm install theon-expect --save-dev
```

Once installed it can now be referenced by simply calling: ```require('theon-expect')(require('theon'))```

## Example

```js
const expect = require('theon-expect')
const theon = expect(require('theon'))

// Declare your API
const api = theon('http://api.server.com')
  .collection('/users')
  .set('Version', '1.0')
  .resource('getById')
  .path('/:id')
  .render()

// Consume your API
api.users
  .getById()
  .param('id', '1234')
  .expect(200)
  .expect('Content-Type', /json/i)
  .expect({ id: 1234, username: 'foo' })
  .end((err, res) => {
    if (err) {
      return console.error('Expect error:', err)
    }
  })
```

## API

You may use any [theon](http://github.com/h2non/theon) methods.

### .expect(status[, fn])

Assert response `status` code.

### .expect(status, body[, fn])

Assert response `status` code and `body`.

### .expect(body[, fn])

Assert response `body` text with a string, regular expression, or
parsed body object.

### .expect(field, value[, fn])

Assert header `field` `value` with a string or regular expression.

### .expect(function(res) {})

Pass a custom assertion function. It'll be given the response object to check. If the response is ok, it should return falsy, most commonly by not returning anything. If the check fails, throw an error or return a truthy value like a string that'll be turned into an error.

Here the string or error throwing options are both demonstrated:

```js
myApi.users
  .getById('/')
  .expect(hasPreviousAndNextKeys)
  .end(done)

function hasPreviousAndNextKeys(res) {
  if (!('next' in res.body)) return "missing next key"
  if (!('prev' in res.body)) throw new Error("missing prev key")
}
```

### .end(fn)

Perform the request and invoke `fn(err, res)`.

## License

MIT
