const Test = require('./lib/test')
const bind = require('./lib/bind')
const assertions = require('./lib/assertions')

/**
 * Test against the given `theon`, returning a new `Test` capable interface.
 *
 * @param {Object} theon
 * @return {Theon}
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

/**
 * Expose `VERSION`
 */

module.exports.VERSION = require('../package.json').version
