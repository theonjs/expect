const Test = require('./test')

/**
 * Expose `bind`.
 */

module.exports = bind

/**
 * Initialize a new `Test` and delegates methods on `theon.Request` prototype.
 *
 * @param {Object} theon
 * @api public
 */

function bind (theon) {
  const Request = theon.Request

  // Original method for delegation
  Request.prototype._dispatch = Request.prototype.dispatch

  // Extend Request prototype with Test
  Object.keys(Test.prototype).forEach(function (name) {
    Request.prototype[name] = Test.prototype[name]
  })

  return theon
}
