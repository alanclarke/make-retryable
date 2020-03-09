[![Travis CI](https://travis-ci.org/alanclarke/make-retryable.svg?branch=master)](https://travis-ci.org/alanclarke/make-retryable)
[![dependencies Status](https://david-dm.org/alanclarke/make-retryable/status.svg)](https://david-dm.org/alanclarke/make-retryable)
[![Coverage Status](https://coveralls.io/repos/github/alanclarke/make-retryable/badge.svg?branch=master)](https://coveralls.io/github/alanclarke/make-retryable?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


# Make Retryable

Makes your function retryable

16 LOC, 100% test coverage, no deps


## Installation

`npm install make-retryable`

## Usage

```js
;(async () => {
  const makeRetryable = require('make-retryable')
  const attempts = 2

  const retryable = makeRetryable(fn, attempts /* defauts to 3 */)

  // Will retry until the promise resolves or attempts reaches zero
  await retryable('https://alz.io')

  // Respects input arguments and return values
  console.log(await retryable(1, 2, 3) === await retryable(1, 2, 3)) // true
})()
```
