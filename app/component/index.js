// Vendors
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import uiRouter from 'angular-ui-router';
import sjWindow from 'angular-sanji-window';
import ocLazyLoad from 'oclazyload';
import sjUtils from 'sanji-utils-ui';

import './404.html';
import theme from './theme.config';
import utils from './utils.config';
import toastr from './toastr.config';
import router from './router.config';

let app = angular.module('sanji.core', [
  ngMaterial,
  ngMdIcons,
  uiRouter,
  sjWindow,
  ocLazyLoad,
  sjUtils
]);

app.config(theme);
app.config(utils);
app.config(toastr);
app.run(router);

export default app = app.name
