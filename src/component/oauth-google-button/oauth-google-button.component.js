const OauthGoogleButtonComponent = {
  bindings: {
    data: '<',
    onUpdate: '&'
  },
  template: `
    <div layout="column">
      <md-button ng-if="!$ctrl.data" class="md-raised" aria-label="google authentication button" ng-click="$ctrl.loginOauth()">
        <md-icon ng-md-icon icon="google-plus-box"></md-icon>
        <span translate="FORM_LABEL_OAUTH_GOOGLE_BUTTON"></span>
      </md-button>
      <p ng-if="$ctrl.data">{{$ctrl.data}}</p>
    </div>
  `,
  controller: class OauthGoogleButtonController {
    constructor(sjio) {
      'ngInject';
      this.sjio = sjio;
    }

    $onInit() {
      this.mySocket = this.sjio.getSocket();
      this.mySocket.on('sj:webapp:message', this.handle.bind(this));
    }

    $onDestroy() {
      this.mySocket.removeListener('sj:webapp:message', this.handle);
    }

    loginOauth() {
      let leftPosition, topPosition;
      const width = 400;
      const height = 600;
      //Allow for borders.
      leftPosition = window.screen.width / 2 - (width / 2 + 10);
      //Allow for title and status bars.
      topPosition = window.screen.height / 2 - (height / 2 + 50);
      //Open the window.
      this.opener = window.open(
        '/api/v1/auth/google',
        'Login into Google',
        `status=no,height=${height},width=${width},resizable=yes,left=${leftPosition},top=${topPosition},screenX=${leftPosition},screenY=${topPosition},toolbar=no,menubar=no,scrollbars=no,location=no,directories=no`
      );
    }

    handle(res) {
      this.opener.close();
      console.log(res);
      if (res.data && res.event === 'sj:google:auth:message') {
        this.data = res.data.token;
        this.onUpdate({
          $evnet: {
            token: this.data
          }
        });
      }
    }
  }
};
export default OauthGoogleButtonComponent;
