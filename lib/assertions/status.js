const http = require('http')

/**
 * Perform assertions on the response status and return an Error upon failure.
 *
 * @param {Number} status
 * @param {Response} res
 * @return {?Error}
 */

module.exports = function (status, res) {
  if (res.status !== status) {
    const a = http.STATUS_CODES[status]
    const b = http.STATUS_CODES[res.status]
    return new Error('expected ' + status + ' "' + a + '", got ' + res.status + ' "' + b + '"')
  }
}