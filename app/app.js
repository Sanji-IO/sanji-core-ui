import 'angular-material.css';
import 'angular-material-icons.css';
import 'svg-morpheus';
import './app.scss';
import 'angular';
import component from './component';

class EthernetController {
  constructor(...injects) {
    EthernetController.$inject.forEach((item, index) => this[item] = injects[index]);
    this.ethernet = {
      ip: '192.168.31.204',
      netmask: '255.255.255.0',
      gateway: '192.168.31.254'
    };
  }
}
EthernetController.$inject = [];

let app = angular.module('webapp', [component]);
app.controller('EthernetController', EthernetController);

