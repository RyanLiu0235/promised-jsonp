var jsonp = require('../')
var test = require('tape')
var qs = require('querystring')

// http://doc.jsfiddle.net/use/echo.html#jsonp
var dest = 'http://jsfiddle.net/echo/jsonp'

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
