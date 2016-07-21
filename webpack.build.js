'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  'ngletteravatar',
  'angular-local-storage',
  'webfontloader'
];

config.module.loaders = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style-loader',
      loader: 'css!postcss!sass?includePaths[]=' + bourbon
    })
  }
].concat(config.module.loaders);

config.module.postLoaders = [
  {test: /\.js$/, loader: 'ng-annotate', exclude: /(node_modules)/}
];
config.postcss = [ autoprefixer({ browsers: ['last 2 versions'] }) ];

config.plugins.push(
  new ExtractTextPlugin('sanji-core-ui.css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  })
);
module.exports = config;
