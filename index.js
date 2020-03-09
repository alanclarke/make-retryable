const inputErrorMessage = new Error('make-retryable expects an integer greater than zero')

module.exports = function makeRetryable (fn, attempts = 3) {
  if ((typeof attempts !== 'number') || isNaN(attempts) || attempts < 0) throw inputErrorMessage
  return async function retry (...args) {
    try {
      return await fn(...args)
    } catch (err) {
      if (attempts > 0) {
        attempts--
        return retry(...args)
      }
      throw err
    }
  }
}
