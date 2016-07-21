import 'angular-busy.css';
import 'angular-material.css';
import 'angular-material-icons.css';
import 'angular-sanji-window.css';
import 'angular-material-data-table.css';
import 'toastr.css';
import './app.scss';
import angular from 'angular';
import {sjCore} from './component';

angular.module('webapp', [sjCore]);

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});
