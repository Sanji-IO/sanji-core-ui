// Vendors
import 'angular-material.css';

import 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import ocLazyLoad from 'oclazyload';
import sjUtils from 'sanji-utils-ui';

import theme from './theme.config';

let app = angular.module('sanji.core', [
  ngMaterial,
  uiRouter,
  ocLazyLoad,
  sjUtils
]);

app.config(theme);

export default app = app.name
