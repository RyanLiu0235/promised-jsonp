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

    window[callbackName] = function(data) {
      document.head.removeChild(script)
      window[callbackName] = noop
      resolve(data)
    }
    var script = document.createElement('script')
    script.src = url
    script.error = function(err) {
      reject(err)
    }
    document.head.appendChild(script)
  })
}
