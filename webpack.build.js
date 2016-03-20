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
// config.externals = [
  // 'jquery',
  // 'jquery-sjSparklines',
  // 'path-to-regexp',
  // 'moment',
  // 'lodash',
  // 'angular',
  // 'api-check',
  // 'angular-formly',
  // 'angular-material',
  // 'angular-material-icons',
  // 'angular-ui-router',
  // 'angular-messages',
  // 'ng-file-upload',
  // 'angular-sanji-window',
  // 'angular-sanitize',
  // 'angular-cookies',
  // 'angular-material-data-table',
  // 'angular-sparklines',
  // 'angular-moment',
  // 'angular-filter',
  // 'oclazyload',
  // 'sanji-utils-ui'
// ];
config.externals = {
  jquery: {
    root: 'jQuery',
    commonjs2: 'jquery',
    commonjs: 'jquery',
    amd: 'jquery'
  },
  'jquery-sparkline': {
    root: 'jSparkline',
    commonjs2: 'jquery-sparkline',
    commonjs: 'jquery-sparkline',
    amd: 'jquery-sparkline'
  },
  'path-to-regexp': {
    root: 'pathToRegexp',
    commonjs2: 'path-to-regexp',
    commonjs: 'path-to-regexp',
    amd: 'path-to-regexp'
  },
  moment: {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment'
  },
  lodash: {
    root: '_',
    commonjs2: 'lodash',
    commonjs: 'lodash',
    amd: 'lodash'
  },
  angular: {
    root: 'angular',
    commonjs2: 'angular',
    commonjs: 'angular',
    amd: 'angular'
  },
  'api-check': {
    root: 'apiCheck',
    commonjs2: 'api-check',
    commonjs: 'api-check',
    amd: 'api-check'
  },
  'angular-formly': {
    root: 'ngFormly',
    commonjs2: 'angular-formly',
    commonjs: 'angular-formly',
    amd: 'angular-formly'
  },
  'angular-material': {
    root: 'ngMaterial',
    commonjs2: 'angular-material',
    commonjs: 'angular-material',
    amd: 'angular-material'
  },
  'angular-material-icons': {
    root: 'ngMaterialIcons',
    commonjs2: 'angular-material-icons',
    commonjs: 'angular-material-icons',
    amd: 'angular-material-icons'
  },
  'angular-ui-router': {
    root: 'uiRouter',
    commonjs2: 'angular-ui-router',
    commonjs: 'angular-ui-router',
    amd: 'angular-ui-router'
  },
  'angular-messages': {
    root: 'ngMessages',
    commonjs2: 'angular-messages',
    commonjs: 'angular-messages',
    amd: 'angular-messages'
  },
  'angular-sanji-window': {
    root: 'sjWindow',
    commonjs2: 'angular-sanji-window',
    commonjs: 'angular-sanji-window',
    amd: 'angular-sanji-window'
  },
  'angular-sanitize': {
    root: 'ngSanitize',
    commonjs2: 'angular-sanitize',
    commonjs: 'angular-sanitize',
    amd: 'angular-sanitize'
  },
  'angular-translate': {
    root: 'ngTranslate',
    commonjs2: 'angular-translate',
    commonjs: 'angular-translate',
    amd: 'angular-translate'
  },
  'angular-translate-storage-cookie': {
    root: 'ngTranslateStorageCookie',
    commonjs2: 'angular-translate-storage-cookie',
    commonjs: 'angular-translate-storage-cookie',
    amd: 'angular-translate-storage-cookie'
  },
  'angular-cookies': {
    root: 'ngCookies',
    commonjs2: 'angular-cookies',
    commonjs: 'angular-cookies',
    amd: 'angular-cookies'
  },
  'angular-material-data-table': {
    root: 'ngMaterialDataTable',
    commonjs2: 'angular-material-data-table',
    commonjs: 'angular-material-data-table',
    amd: 'angular-material-data-table'
  },
  'angular-sparklines': {
    root: 'ngSparklines',
    commonjs2: 'angular-sparklines',
    commonjs: 'angular-sparklines',
    amd: 'angular-sparklines'
  },
  'angular-moment': {
    root: 'ngMoment',
    commonjs2: 'angular-moment',
    commonjs: 'angular-moment',
    amd: 'angular-moment'
  },
  'angular-filter': {
    root: 'angularFilter',
    commonjs2: 'angular-filter',
    commonjs: 'angular-filter',
    amd: 'angular-filter'
  },
  'oclazyload': {
    root: 'ocLazyLoad',
    commonjs2: 'oclazyload',
    commonjs: 'oclazyload',
    amd: 'oclazyload'
  },
  'sanji-utils-ui': {
    root: 'sjUtils',
    commonjs2: 'sanji-utils-ui',
    commonjs: 'sanji-utils-ui',
    amd: 'sanji-utils-ui'
  },
  'ngletteravatar': {
    root: 'ngLetterAvatar',
    commonjs2: 'ngletteravatar',
    commonjs: 'ngletteravatar',
    amd: 'ngletteravatar'
  },
  'angular-cron-jobs': {
    root: 'ngCronJobs',
    commonjs2: 'angular-cron-jobs',
    commonjs: 'angular-cron-jobs',
    amd: 'angular-cron-jobs'
  }
};

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
