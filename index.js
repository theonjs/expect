const Test = require('./lib/test')
const bind = require('./lib/bind')
const assertions = require('./lib/assertions')

/**
 * Test against the given `theon`,
 * returning a new `Test`.
 *
 * @param {Object} theon
 * @api public
 */

module.exports = function (theon) {
  return bind(theon)
}

/**
 * Expose `Test`
 */

module.exports.Test = Test

/**
 * Expose `bind`
 */

module.exports.bind = bind

/**
 * Expose `assertions`
 */

module.exports.assertions = assertions
