var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    site: './source/javascripts/index.js'
  },

  // resolve: {
  //   root: `${__dirname}/source/javascripts`,
  // },

  output: {
    path: `${__dirname}/.tmp/dist`,
    filename: 'javascripts/[name].js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
  ]
  // module: {
  //   loaders: [
  //     {
  //       test: /source\/javascripts\/.*\.js$/,
  //       exclude: /node_modules|\.tmp|vendor/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015', 'stage-0'],
  //       },
  //     },
  //   ],
  // },
};
