import './tag-list.tpl.html';
import TagListController from './tag-list.controller';

const TagSelectorComponent = {
  bindings: {
    data: '<',
    basePath: '@?',
    apiToken: '@?',
    onUpdate: '&'
  },
  template: `
    <div layout="column">
      <md-button class="md-raised" ng-click="$ctrl.showTagList($event)">Select Tags</md-button>
    </div>
  `,
  controller: class TagSelectorController {
    constructor($mdDialog, rest) {
      'ngInject';
      this.$mdDialog = $mdDialog;
      this.rest = rest;
    }

    showTagList(event) {
      const restConfig = {
        basePath: this.basePath || null
      };
      if (this.apiToken) {
        this.restConfig.headers = { 'mx-api-token': this.apiToken };
      }
      this.rest.get('/mxc/equipments', restConfig).then(res => {
        this.$mdDialog
          .show({
            templateUrl: 'sanji-tag-selector-list.tpl.html',
            controller: TagListController,
            controllerAs: '$ctrl',
            bindToController: true,
            targetEvent: event,
            locals: {
              devices: res.data,
              data: this.data || []
            },
            clickOutsideToClose: true
          })
          .then(data => {
            this.onUpdate({
              $event: {
                data
              }
            });
          });
      });
    }
  }
};

export default TagSelectorComponent;
