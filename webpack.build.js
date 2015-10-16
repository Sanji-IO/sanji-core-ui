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
config.output.library = 'sjCore';
config.output.libraryTarget = 'umd';
config.externals = {
  'lodash': '_',
  'angular': 'angular',
  'api-check': 'apiCheck',
  'angular-formly': 'ngFormly',
  'angular-material': 'ngMaterial',
  'angular-material-icons': 'ngMdIcons',
  'angular-ui-router': 'uiRouter',
  'ng-file-upload': 'ngFileUpload',
  'angular-sanji-window': 'sjWindow',
  'oclazyload': 'ocLazyLoad',
  'sanji-utils-ui': 'sjUtils'
};

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
