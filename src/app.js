import 'angular-busy.css';
import 'angular-material.css';
import 'angular-material-icons.css';
import 'angular-sanji-window.css';
import 'angular-material-data-table.css';
import 'toastr.css';
import './app.scss';
import angular from 'angular';
import { sjCore } from './component';
import { SOCKET_INIT_CONNECT_EVENT } from 'sanji-socket-ui';

const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';
const category = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || { name: undefined };
    default:
      return state;
  }
};
angular
  .module('webapp', [sjCore])
  .config(reduxHelperProvider => {
    'ngInject';
    reduxHelperProvider.configure(
      {
        category
      },
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  })
  .run(($ngRedux, reduxHelper, sjio, $rootScope) => {
    'ngInject';
    const test = (state = [], { type, payload }) => {
      switch (type) {
        case 'GET_CATEGORIES':
          return payload || state;
        default:
          return state;
      }
    };
    reduxHelper.injectAsyncReducer('test', test);
    console.log($ngRedux);
    const ws = sjio.connect();
    $rootScope.$broadcast(SOCKET_INIT_CONNECT_EVENT, ws);
  });

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});
