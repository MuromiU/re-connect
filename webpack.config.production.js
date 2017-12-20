let common = require('./webpack.config.js');
let webpack = require('webpack');

let config = {
  externals: {
    'react'       : 'umd react',
    'react-dom'   : 'umd react-dom'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
};

module.exports = ({...common.gen({src: "lib", entry: "re-connect.js"}), ...config});









