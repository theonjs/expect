/**
 * Perform assertions on a response header and return an Error upon failure.
 *
 * @param {Object} header
 * @param {Response} res
 * @return {?Error}
 */

module.exports = function (header, res) {
  const field = header.name
  const actual = res.headers[field.toLowerCase()]
  if (null == actual) return new Error('expected "' + field + '" header field')
  
  const fieldExpected = header.value
  if (fieldExpected == actual) return
  
  if (fieldExpected instanceof RegExp) {
    if (!fieldExpected.test(actual)) return new Error('expected "' + field + '" matching ' + fieldExpected + ', got "' + actual + '"')
  } else {
    return new Error('expected "' + field + '" of "' + fieldExpected + '", got "' + actual + '"')
  }
}