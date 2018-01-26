/**
 * promised-jsonp
 *
 * options
 *  - url
 *  - prefix  {String}
 *  - data    {Object}
 */

var id = 0
var noop = function() {}

module.exports = function(url, options) {
  if (options === undefined) options = {}
  if (typeof url === 'object') {
    options = url
    url = options.url
  }

  return new Promise(function(resolve, reject) {
    var callbackName = (options.prefix || '__jsonp') + id++
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + callbackName

    var data = options.data
    if (typeof data === 'object') {
      var keys = Object.keys(data)
      var len = keys.length

      while (len--) {
        url += '&' + keys[len] + '=' + data[keys[len]]
      }
    }

    window[callbackName] = function(data) {
      document.head.removeChild(script)
      window[callbackName] = noop
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
