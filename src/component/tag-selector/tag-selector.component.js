import './tag-list.tpl.html';
import './tag-list.style.scss';
import TagListController from './tag-list.controller';

const TagSelectorComponent = {
  bindings: {
    data: '<',
    onUpdate: '&'
  },
  template: `
    <div div layout="column">
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
        basePath: process.env.NODE_ENV === 'development' ? __BASE_PATH__ : undefined
      };
      if (process.env.NODE_ENV === 'development') {
        restConfig.headers = { 'mx-api-token': __API_TOKEN__ };
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
              data: []
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
