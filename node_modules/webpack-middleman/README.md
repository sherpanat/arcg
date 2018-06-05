webpack-middleman
=====

**DO NOT USE IN PRODUCTION**

This package should only be used for **development** configurations, there are no check done to prevent sockets request!

Ugly little fork  of the regular [webpack-dev-server](https://github.com/webpack/webpack-dev-server) client, born out of necessity, for the gem [middleman-webpack](https://github.com/lovethebomb/middleman-webpack).


This client will connect to `middleman-webpack` socket and listens for refresh calls.

## Installation
```sh
$ npm install webpack-middleman
```

### Usage & API
In your `webpack.config.js` development entries, add the client to your main chunk or in a separate chunk, like this:

```nodejs
...

entry: {
    'js/app': [
        './src/app.js',
        'webpack-middleman/?ws://0.0.0.0:25123'
    ]
},

...
```

where `0.0.0.0:25123` is the host and port of your middleman-webpack instance.


## License
[MIT](https://tldrlegal.com/license/mit-license)
