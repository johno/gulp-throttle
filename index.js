'use strict';

// https://github.com/tjgq/grunt-throttle/blob/master/tasks/throttle.js

var gutil = require('gulp-util'),
    net = require('net'),
    throttleGroup = require('stream-throttle').ThrottleGroup;

var defaults = {
  localhost: '127.0.0.1',
  remotehost: '127.0.0.1',
  upstream: 10*1024,
  downstream: 100*1024,
  keep_alive: false
};

module.exports = function(opts) {
  opts = opts || {};
  opts.localhost  = opts.localhost || defaults.localhost;
  opts.remotehost = opts.remotehost || defaults.remotehost;
  opts.upstream   = opts.upstream || defaults.upstream;
  opts.donwstream = opts.downstream || defaults.downstream;
  opts.keep_alive = opts.keepalive || defaults.keepalive;

  var upThrottle = new ThrottleGroup({ rate: opts.upstream });
  var downThrottle = new ThrottleGroup({ rate: opts.downstream });

  var server = net.createServer({ allowHalfOpen: true }, function(local) {
    var remote = net.createConnection({
      host: opts.remote_host,
      port: opts.remote_port,
      allowHalfOpen: true
    });

    var localThrottle  = upThrottle.throttle();
    var remoteThrottle = downThrottle.throttle();

    local.pipe(localThrottle).pipe(remote);
    local.on('error', function() {
      local.destroy();
      remote.destroy();
    });

    server.listen(opts.local_port, opts.localhost);

    server.on('listening', function() {
      var localAddress = opts.localhost + ':' + opts.local_port;
      var remoteAddress = opts.remotehost + ':' + opts.remote_port;
      gutil.log('Throttling connections to ' + remoteAddress + ', go to '+ localAddress);
    });

    server.on('error', function(err) {
      var err = new gutil.PluginError('gulp-throttle', 'server failed');
    });

    var done = this.async();
    if (!opts.keep_alive) {
      done();
    }
  });
};
