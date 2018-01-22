var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Define our vendor libraries
const VENDOR_LIBS = [
  'faker',
  'lodash',
  'react',
  'react-dom',
  'react-input-range',
  'react-redux',
  'react-router',
  'redux',
  'redux-form',
  'redux-thunk',
]

module.exports = {
  // using multiple entry points:
  entry: {
    bundle: './src/index.js', // generate bundle.js based on /src/index.js
    vendor: VENDOR_LIBS // generate vendor.js based on our vendor libraries
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // name output file as the key from the entry section, add a hash to create unique filename
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/, // do not try to apply babel to any files in 'node_modules' directory
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // Look at our outputs...
    new webpack.optimize.CommonsChunkPlugin({
      // ...if any duplicates, only include them in vendor.js
      names: ['vendor', 'manifest'] // create manifest to tell if vendor file has changed
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })

  ]
};
