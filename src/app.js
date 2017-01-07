import 'angular-busy.css';
import 'angular-material.css';
import 'angular-material-icons.css';
import 'angular-sanji-window.css';
import 'angular-material-data-table.css';
import 'toastr.css';
import './app.scss';
import angular from 'angular';
import { sjCore } from './component';

const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';
const category = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || { name: undefined };
    default:
      return state;
  }
};
class AppController {
  constructor() {
    this.cronExpression = '0 8 9 9 1/8 ? *';
    this.cronOptions = {
      hideMinutesTab: false, // Whether to hide the minutes tab
      hideHourlyTab: false, // Whether to hide the hourly tab
      hideDailyTab: false, // Whether to hide the daily tab
      hideWeeklyTab: false, // Whether to hide the weekly tab
      hideMonthlyTab: false, // Whether to hide the monthly tab
      hideYearlyTab: false, // Whether to hide the yearly tab
      hideAdvancedTab: true, // Whether to hide the advanced tab
      use24HourTime: false, // Whether to show AM/PM on the time selectors
      hideSeconds: true // Whether to show/hide the seconds time picker
    };
    this.isCronDisabled = false;
  }
}
angular.module('webapp', [sjCore])
.config(reduxHelperProvider => {
  'ngInject';
  reduxHelperProvider.configure({
    category
  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
})
.controller('AppController', AppController)
.run(($ngRedux, reduxHelper) => {
  'ngInject';
  const test = (state = [], {type, payload}) => {
    switch (type) {
      case 'GET_CATEGORIES':
        return payload || state;
      default:
        return state;
    }
  };
  reduxHelper.injectAsyncReducer('test', test);
  console.log($ngRedux);
});

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});
