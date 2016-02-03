const assertions = require('./assertions')

/**
 * Expose `Test`.
 */

module.exports = Test

/**
 * Initialize a new `Test`.
 *
 * @api public
 */

function Test (Request) {
  this._req = Request
  this._dispatch = Request.prototype.dispatch
}

/**
 * Expectations:
 *
 *   .expect(200)
 *   .expect(200, fn)
 *   .expect(200, body)
 *   .expect('Some body')
 *   .expect('Some body', fn)
 *   .expect('Content-Type', 'application/json')
 *   .expect('Content-Type', 'application/json', fn)
 *   .expect(fn)
 *
 * @return {Test}
 * @api public
 */

Test.prototype.expect = function (a, b, c) {
  if (!this._asserts) this._asserts = []

  // callback
  if ('function' === typeof a) {
    this._asserts.push(a)
    return this
  }
  if ('function' === typeof b) this.end(b)
  if ('function' === typeof c) this.end(c)

  // status
  if ('number' === typeof a) {
    this._asserts.push(assertions.status.bind(this, a))
    // body
    if ('function' != typeof b && arguments.length > 1)
      this._asserts.push(assertions.body.bind(this, b))
    return this
  }

  // header field
  if ('string' === typeof b || 'number' === typeof b || b instanceof RegExp) {
    this._asserts.push(assertions.header.bind(this, { name: '' + a, value: b }))
    return this
  }

  // body
  this._asserts.push(assertions.body.bind(this, a))

  return this
}

/**
 * Defer invoking theon's `.dispatch()` until
 * the server is listening.
 *
 * @param {Function} cb
 * @api public
 */

Test.prototype.dispatch = function (cb) {
  const self = this

  this._dispatch(function (err, res) {
    self.assert(err, res, cb)
  })

  return this
}

/**
 * Perform assertions and invoke `fn(err, res)`.
 *
 * @param {?Error} resError
 * @param {Response} res
 * @param {Function} fn
 * @api private
 */

Test.prototype.assert = function (resError, res, fn) {
  var error

  // asserts
  for (var i = 0; i < this._asserts.length && !error; i += 1) {
    error = assertions.fn(this._asserts[i], res)
  }

  // set unexpected error if no other error has occurred.
  if (!error && resError instanceof Error &&
    (!res || resError.status !== res.status))
    error = resError

  fn.call(this, error || null, res)
}