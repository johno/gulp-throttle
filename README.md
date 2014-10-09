# Gulp Throttle

A gulp plugin to test your web app with slow internet connections. Based off of grunt-throttle.

## Installation

```
npm install --save-dev gulp-throttle
```

## Usage

You can create a custom task in your gulpfile like so:

`gulpfile.js`
```js
var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    throttle = require('gulp-throttle');

gulp.task('throttle', function() {
  connect.server();

  throttle({
    local_port: '8081',
    remote_port: '8080',
    upstream: 2000,
    downstream: 2000,
    keep_alive: true });
});
```

## Acknowledgements

Adapted for the gulp ecosystem from [grunt-throttle](https://github.com/tjgq/grunt-throttle)
by Tiago Quelhas.

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com).
