# promised-jsonp

## usage

``` js
jsonp('someurl').then(data => {}, err => {})

// or you could alse pass an object to jsonp
jsonp({
	url: 'someurl',
	prefix: '__jp'
}).then(data => {}, err => {})
```