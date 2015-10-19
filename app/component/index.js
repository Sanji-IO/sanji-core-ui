// Vendors
import pathToRegexp from 'path-to-regexp';
import apiCheck from 'api-check';
import _ from 'lodash';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import formly from 'angular-formly';
import uiRouter from 'angular-ui-router';
import sjWindow from 'angular-sanji-window';
import ocLazyLoad from 'oclazyload';
import sjUtils from 'sanji-utils-ui';

import './404.html';
import theme from './theme.config';
import utils from './utils.config';
import toastr from './toastr.config';
import router from './router.config';
import form from './formly.config';

let app = angular.module('sanji.core', [
  ngMaterial,
  ngMdIcons,
  formly,
  uiRouter,
  sjWindow,
  ocLazyLoad,
  sjUtils
]);

app.constant('pathToRegexp', pathToRegexp);
app.constant('apiCheck', apiCheck);
app.constant('_', _);
app.config(theme);
app.config(utils);
app.config(toastr);
app.run(router);
app.run(form);

export default app = app.name
