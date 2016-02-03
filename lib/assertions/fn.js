/**
 * Performs an assertion by calling a function and return an Error upon failure.
 *
 * @param {Function} fn
 * @param {Response} res
 * @return {?Error}
 */

module.exports = function (check, res) {
  var err
  try {
    err = check(res)
  } catch(e) {
    err = e
  }
  if (err instanceof Error) return err
}