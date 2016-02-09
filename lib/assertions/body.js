const util = require('util')
const assert = require('assert')

/**
 * Perform assertions on a response body and return an Error upon failure.
 *
 * @param {Mixed} body
 * @param {Response} res
 * @return {?Error}
 */

module.exports = function (body, res) {
  const isregexp = body instanceof RegExp

  if (typeof body === 'object' && !isregexp) {
    return assertParsedBody(body, res)
  }

  if (body !== res.body) {
    return assertStringBody(body, res, isregexp)
  }
}

function assertParsedBody (body, res) {
  try {
    assert.deepEqual(body, res.body)
  } catch (err) {
    const a = util.inspect(body)
    const b = util.inspect(res.body)
    console.log('>>>', res)
    return error('expected ' + a + ' response body, got ' + b, body, res.body)
  }
}

function assertStringBody (body, res, isregexp) {
  const a = util.inspect(body)
  const b = util.inspect(res.text || res.body)

  // regexp
  if (isregexp) {
    if (!body.test(res.text || res.body)) {
      return error('expected body ' + b + ' to match ' + body, body, res.body)
    }
  } else {
    return error('expected ' + a + ' response body, got ' + b, body, res.body)
  }
}

/**
 * Return an `Error` with `msg` and results properties.
 *
 * @param {String} msg
 * @param {Mixed} expected
 * @param {Mixed} actual
 * @return {Error}
 * @api private
 */

function error (msg, expected, actual) {
  const err = new Error(msg)
  err.expected = expected
  err.actual = actual
  err.showDiff = true
  return err
}
