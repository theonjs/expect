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
  
  // parsed
  if ('object' == typeof body && !isregexp) {
    try {
      assert.deepEqual(body, res.body)
    } catch (err) {
      var a = util.inspect(body)
      var b = util.inspect(res.body)
      return error('expected ' + a + ' response body, got ' + b, body, res.body)
    }
    return
  }
  
  // string
  if (body !== res.body) {
    var a = util.inspect(body)
    var b = util.inspect(res.text)

    // regexp
    if (isregexp) {
      if (!body.test(res.text)) {
        return error('expected body ' + b + ' to match ' + body, body, res.body)
      }
    } else {
      return error('expected ' + a + ' response body, got ' + b, body, res.body)
    }
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
