'use strict';

var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var bourbon = require('node-bourbon').includePaths;
var config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-core-ui.js';
config.output.libraryTarget = 'umd';
config.output.externals = [
  'jquery',
  'jquery-sjSparklines',
  'path-to-regexp',
  'moment',
  'lodash',
  'angular',
  'api-check',
  'angular-formly',
  'angular-material',
  'angular-material-icons',
  'angular-ui-router',
  'ng-file-upload',
  'angular-sanji-window',
  'angular-sanitize',
  'angular-cookies',
  'angular-material-data-table',
  'angular-sparklines',
  'angular-moment',
  'angular-filter',
  'oclazyload',
  'sanji-utils-ui'
];

config.module.loaders = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?browsers=last 2 versions!sass?includePaths[]=' + bourbon)
  }
].concat(config.module.loaders);

config.plugins.push(
  new ExtractTextPlugin('sanji-core-ui.css'),
  new WebpackNotifierPlugin({title: 'Webpack'}),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
);
module.exports = config;
