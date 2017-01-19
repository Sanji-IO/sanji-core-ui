/* global Offline */

// Vendors
import 'offline-js';
import 'jquery';
import 'jquery-sparkline';
import webFont from 'webfontloader';
import pathToRegexp from 'path-to-regexp';
import apiCheck from 'api-check';
import moment from 'moment';
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngMdIcons from 'angular-material-icons';
import formly from 'angular-formly';
import LocalStorageModule from 'angular-storage';
import i18n from 'angular-translate';
import 'angular-translate-storage-cookie';
import ngMaterialTable from 'angular-material-data-table';
import sjWindow from 'angular-sanji-window';
import sjSparklines from 'angular-sparklines';
import ngFileSaver from 'angular-file-saver';
import ocLazyLoad from 'oclazyload';
import {sjUtils} from 'sanji-utils-ui';
import {sjRedux} from 'sanji-redux-ui';
import 'ngletteravatar';
import 'angular-moment';
import 'angular-filter';
import 'angular-cron-jobs';

import './404.html';
import theme from './theme.config';
import lang from './i18n.config';
import utils from './utils.config';
import toastr from './toastr.config';
import router from './router.config';
import formlyConfig from './formly.config';
import DownloadHelper from './helper/download.helper';

// default material font
webFont.load({
  google: {
    families: ['Roboto']
  }
});

Offline.options = {
  // Should we check the connection status immediatly on page load.
  checkOnLoad: true,
  // Should we automatically retest periodically when the connection is down (set to false to disable).
  reconnect: {
    // How many seconds should we wait before rechecking.
    initialDelay: 3,
    // How long should we wait between retries.
    delay: 3
  },
  // Should we store and attempt to remake requests which fail while the connection is down.
  requests: false
};

const app = angular.module('sanji.core', [
  ngSanitize,
  ngCookies,
  ngMaterial,
  ngMessages,
  ngMdIcons,
  ngMaterialTable,
  'angularMoment',
  'angular.filter',
  ngFileSaver,
  sjSparklines,
  formly,
  LocalStorageModule,
  i18n,
  sjWindow,
  ocLazyLoad,
  'ngLetterAvatar',
  'angular-cron-jobs',
  sjRedux,
  sjUtils
]);
app.constant('pathToRegexp', pathToRegexp);
app.constant('apiCheck', apiCheck);
app.constant('moment', moment);
app.config(theme);
app.config(lang);
app.config(utils);
app.config(toastr);
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
  return function(val) {
    return $sce.trustAsResourceUrl(val);
  };
}]);
app.service('downloadHelper', DownloadHelper);
app.run(router);
app.run(($state, socket) => {
  'ngInject';
  if (process.env.NODE_ENV === 'production') {
    $state.defaultErrorHandler(function() { /* do nothing */});
  }
  socket.on('disconnect', () => {
    Offline.check();
  });
});

formlyConfig(app);
apiCheck.globalConfig.disabled = (process.env.NODE_ENV === 'production');

const sjCore = app.name;

export {sjCore};