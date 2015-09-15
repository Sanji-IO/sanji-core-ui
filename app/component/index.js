// Vendors
import 'svg-morpheus';
import 'angular';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import uiRouter from 'angular-ui-router';
import sjWindow from 'angular-sanji-window';
import ocLazyLoad from 'oclazyload';
import sjUtils from 'sanji-utils-ui';

import theme from './theme.config';

let app = angular.module('sanji.core', [
  ngMaterial,
  ngMdIcons,
  uiRouter,
  sjWindow,
  ocLazyLoad,
  sjUtils
]);

app.config(theme);

export default app = app.name
