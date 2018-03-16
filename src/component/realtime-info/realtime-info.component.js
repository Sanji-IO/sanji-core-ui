const RealtimeInfoComponent = {
  bindings: {
    data: '<',
    event: '@?',
    key: '@',
    label: '@?'
  },
  template: `
    <div layout>
      <p flex="80">{{ $ctrl.label }}</p>
      <p flex="20" style="text-align: right;">{{$ctrl.data || ''}}</p>
    </div>
  `,
  controller: class ConnectStatusController {
    constructor(sjio) {
      'ngInject';
      this.sjio = sjio;
      this.mySocket = null;
    }

    $onInit() {
      this.mySocket = this.sjio.getSocket();
      if (this.mySocket) {
        this.mySocket.on('sj:webapp:message', this.handle.bind(this));
      }
    }

    $onDestroy() {
      if (this.mySocket) {
        this.mySocket.removeListener('sj:webapp:message', this.handle);
      }
    }

    handle(res) {
      if (res.data && res.event === this.event) {
        this.data = res.data[this.key];
      }
    }
  }
};
export default RealtimeInfoComponent;
