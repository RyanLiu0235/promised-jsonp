# promised-jsonp

Promised-jsonp is mainly inspired by [jsonp](https://github.com/webmodules/jsonp), **jsonp** is popular but handles result with callback, which is a little bit old-fashioned. So I build promised-jsonp. It's basically a wrapper of **jsonp**, but I rewrite it.

## usage

``` js
jsonp('www.someurl.com/api/?foo=boo')
	.then(data => {}, err => {})

// or you could also pass an object to jsonp
jsonp({
	url: 'www.someurl.com/api/',
	data: {
		foo: 'boo'
	},
	prefix: '__jp'
}).then(data => {}, err => {})
```

## test

``` bash
$ npm run test
```