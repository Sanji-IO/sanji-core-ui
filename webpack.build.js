'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var bourbon = require('node-bourbon').includePaths;
var config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-core-ui.js';
config.output.libraryTarget = 'umd';
config.output.library = 'sjCore';
config.externals = [
  'jquery',
  'jquery-sparkline',
  'path-to-regexp',
  'moment',
  'lodash',
  'angular',
  'api-check',
  'angular-formly',
  'angular-material',
  'angular-material-icons',
  'angular-ui-router',
  'angular-messages',
  'angular-sanji-window',
  'angular-sanitize',
  'angular-translate',
  'angular-translate-storage-cookie',
  'angular-cookies',
  'angular-material-data-table',
  'angular-sparklines',
  'angular-moment',
  'angular-cron-jobs',
  'angular-filter',
  'oclazyload',
  'sanji-utils-ui',
  'ngletteravatar'
];

config.module.loaders = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?browsers=last 2 versions!sass?includePaths[]=' + bourbon)
  }
].concat(config.module.loaders);

config.plugins.push(
  new ExtractTextPlugin('sanji-core-ui.css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);
module.exports = config;
