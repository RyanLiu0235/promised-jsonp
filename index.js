/**
 * promised-jsonp
 *
 * options
 *  - url             {String}
 *  - prefix          {String}
 *  - data            {Object}
 *  - callbackName    {String}
 *  - timeout         {Number}
 */

var id = 0
var noop = function() {}

module.exports = function(url, options) {
  if (options === undefined) options = {}
  if (typeof url === 'object') {
    options = url
    url = options.url
  }
  var prefix = options.prefix || '__jsonp'
  var callback = prefix + id++
  var param = (options.callbackName || 'callback')
  var timeout = options.timeout !== undefined ? options.timeout : 60000

  url += (url.indexOf('?') === -1 ? '?' : '&') + param + '=' + callback

  var data = options.data
  if (typeof data === 'object') {
    var keys = Object.keys(data)
    var len = keys.length

    while (len--) {
      url += '&' + keys[len] + '=' + data[keys[len]]
    }
  }

  return new Promise(function(resolve, reject) {
    function clear() {
      document.head.removeChild(script)
      window[callback] = noop
    }

    if (timeout) {
      setTimeout(function() {
        clear()
        reject(new Error('timeout'))
      }, timeout)
    }
    window[callback] = function(data) {
      clear()
      resolve(data)
    }
    var script = document.createElement('script')
    script.src = url

    script.onerror = function(err) {
      reject(err)
    }
    document.head.appendChild(script)
  })
}
