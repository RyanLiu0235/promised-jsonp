var jsonp = require('../')
var test = require('tape')
var qs = require('querystring')

// http://doc.jsfiddle.net/use/echo.html#jsonp
var dest = 'http://jsfiddle.net/echo/jsonp/'

test('basic usage of promised-jsonp', t => {
  t.plan(1)
  var params = {
    ping: 'pong'
  }
  var queries = qs.encode(params)

  jsonp(dest + '?' + queries).then(data => {
    t.deepEqual(data, params)
  })
})

test('should return a rejected promise when something goes wrong', t => {
  t.plan(1)
  var params = {
    ping: 'pong'
  }
  var queries = qs.encode(params)

  jsonp(dest + 'ghost/' + '?' + queries).catch(() => {
    t.pass('promised-jsonp has dealt a wrong url with a rejected promise')
  })
})

test('could also receive an object as the only param', t => {
  t.plan(1)
  var params = {
    ping: 'pong'
  }
  jsonp({
    url: dest,
    data: params,
    prefix: '__jp',
    callbackName: 'callback',
    timeout: 2
  }).then(data => {
    t.deepEqual(data, params)
  }, err => {
    t.pass()
  })
})

test('throw an error when timeout', t => {
  t.plan(1)
  var params = {
    ping: 'pong'
  }
  jsonp({
    url: dest,
    data: params,
    timeout: 2 // assume that 2ms is far more than enough for a request to be fully answered
  }).catch(err => {
    t.pass('received error when timeout, 2ms is given.')
  })
})
