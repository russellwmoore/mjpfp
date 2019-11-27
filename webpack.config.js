const path = require('path');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public'),
    },
    devtool: 'source-map',
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
    plugins: [
        new MomentLocalesPlugin(),
    ],
  };

module.exports = config;
