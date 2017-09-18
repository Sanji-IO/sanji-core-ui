const ConnectStatusComponent = {
  bindings: {
    data: '<',
    event: '@',
    key: '@'
  },
  template: `
    <md-input-container class="md-icon-float md-icon-Right md-block">
      <p translate="FORM_LABEL_CLOUD_CONNECTION_STATUS"></p>
      <md-icon ng-if="$ctrl.data" ng-md-icon icon="cloud_done" style="color: green"></md-icon>
      <md-icon ng-if="!$ctrl.data" ng-md-icon icon="cloud_off" style="color: red"></md-icon>
    </md-input-container>
  `,
  controller: class ConnectStatusController {
    constructor(sjio) {
      'ngInject';
      this.sjio = sjio;
    }

    $onInit() {
      const mySocket = this.sjio.getSocket();
      this.unSocketHandler = mySocket.on(`sj:socket:${this.event}`, res => (this.data = res.data[this.key]));
    }

    $onDestroy() {
      this.unSocketHandler();
    }
  }
};
export default ConnectStatusComponent;
