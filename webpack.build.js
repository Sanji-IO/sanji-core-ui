const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const config = require('./webpack.config.js');

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
  'angular-breadcrumb',
  'angular-formly',
  'angular-material',
  'angular-material-icons',
  'angular-material-zippy',
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
  'angular-file-saver',
  'oclazyload',
  'sanji-utils-ui',
  'sanji-socket-ui',
  'sanji-redux-ui',
  'ngletteravatar',
  'angular-storage',
  'webfontloader',
  'redux',
  'redux-thunk',
  'ng-redux',
  'offline-js',
  'nanoid',
  'ng-idle'
];

config.module.rules = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: bourbon
          }
        }
      ]
    })
  }
].concat(config.module.rules);

config.plugins.push(
  new ExtractTextPlugin('sanji-core-ui.css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      dead_code: true
    }
  })
);
module.exports = config;
