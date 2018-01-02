let path = require('path');
let webpack = require('webpack');

let DIST_PATH = "dist";
let SRC_PATH = "src";
let ENTRY = "index.js";

let parser = (paths = {}) => Object.keys(paths).reduce((acc, cur) => (acc[cur] = path.resolve(__dirname, paths[cur]), acc), {});

let nullable = (v, f) => (x = v) => f(x);

module.exports = {
  default: {
    dist: DIST_PATH,
    src: SRC_PATH,
    entry: ENTRY,
  },
  gen: nullable({}, ({dist = DIST_PATH, src = SRC_PATH, entry = ENTRY}) => {
    let {dist: distPath, src: srcPath, entry: entryPath} = parser({dist, src, entry});
    return {
      entry: srcPath + '/' + entry,
      output: {
        path: distPath,
        filename: 'index.js',
        libraryTarget: "umd",
        library: "re-connect"
      },
      plugins: [
        new webpack.ProvidePlugin({
          React: 'react',
        }),
      ],
      module: {loaders: [
        {test: /\.(js|jsx)$/, loaders: ['babel-loader'], exclude: /node_modules/},
      ]}
    };
  })
};
