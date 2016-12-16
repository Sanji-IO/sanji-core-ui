const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
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
  'angular-file-saver',
  'oclazyload',
  'sanji-utils-ui',
  'ngletteravatar',
  'angular-storage',
  'webfontloader',
  'redux',
  'redux-thunk',
  'ng-redux',
  'offline-js'
];

config.module.rules = [
  {test: /\.js$/, loader: 'ng-annotate-loader', exclude: /(node_modules)/, enforce: 'post'},
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style-loader',
      loader: 'css-loader!postcss-loader!sass-loader?includePaths[]=' + bourbon
    })
  }
].concat(config.module.rules);

config.plugins.push(
  new ExtractTextPlugin('sanji-core-ui.css'),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true,
    options:{
      postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
      ]
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      dead_code: true
    }
  })
);
module.exports = config;
