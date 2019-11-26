const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
  };

module.exports = config;
