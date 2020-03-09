const test = require('ava')
const makeRetryable = require('./')
const inputErrorMessage = 'make-retryable expects an integer greater than zero'
const eek = new Error('eek')
const success = 'hooray!'

;[undefined, 2, 4, 5].forEach(attempts => {
  test(`succeeds after ${attempts || 3} attempts`, async t => {
    const stub = makeRetryable(succeedEventually((attempts || 3) - 1, success), attempts)
    const result = await stub()
    t.is(result, success)
  })
})

test('does not retry if n is zero', async t => {
  const stub = makeRetryable(succeedEventually(1, success), 0)
  await t.throwsAsync(() => stub(), {
    message: eek.message
  })
})

test('accepts and returns args', async t => {
  const stub = makeRetryable(args => args)
  const args = [1, 2, 3]
  t.is(await stub(args), args)
})

test('throws errors', async t => {
  const stub = makeRetryable(() => {
    throw eek
  }, 0)
  return stub().catch(err => t.is(err, eek))
})

test('rejects n less than zero', async t => {
  t.throws(() => makeRetryable(null, -1), {
    message: inputErrorMessage
  })
})

test('rejects non-integer n', async t => {
  t.throws(() => makeRetryable(null, NaN), {
    message: inputErrorMessage
  })
})

function succeedEventually (n, success) {
  return () => {
    if (n <= 0) return Promise.resolve(success)
    n--
    return Promise.reject(eek)
  }
}
