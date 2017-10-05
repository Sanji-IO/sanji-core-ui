import OauthGoogleButtonComponent from './oauth-google-button.component';

const oauthGoogleButtonModule = angular
  .module('webapp.oauthGoogleButton', [])
  .component('oauthGoogleButton', OauthGoogleButtonComponent).name;
export { oauthGoogleButtonModule };
