const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "buffer": require.resolve("buffer/"),
      "timers": require.resolve("timers-browserify"),
      "url": require.resolve("url/"),
      "zlib": require.resolve("browserify-zlib"),
      "process": require.resolve("process/browser"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false,
      "child_process": false,
      "worker_threads": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "net": false,
      "tls": false,
      "dns": false,
      "perf_hooks": false,
      "async_hooks": false,
      "diagnostics_channel": false,
      "vm": require.resolve("vm-browserify"),
      "constants": require.resolve("constants-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "punycode": require.resolve("punycode/"),
      "dgram": false,
      "repl": false,
      "readline": false,
      "inspector": false,
      "module": false,
      "domain": require.resolve("domain-browser"),
      "events": require.resolve("events/"),
      "http2": false,
      "stream/promises": false,
      "timers/promises": false,
      "util/types": false
    }
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};