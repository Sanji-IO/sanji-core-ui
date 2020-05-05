import "./tag-list.tpl.html";
import TagListController from "./tag-list.controller";

const TagSelectorComponent = {
  bindings: {
    data: "<",
    isSparkplug: "<",
    basePath: "@?",
    apiToken: "@?",
    onUpdate: "&",
  },
  template: `
    <div layout="column">
      <md-button class="md-raised" ng-click="$ctrl.showTagList($event)">Select Tags</md-button>
    </div>
  `,
  controller: class TagSelectorController {
    constructor($mdDialog, rest) {
      "ngInject";
      this.$mdDialog = $mdDialog;
      this.rest = rest;
    }

    getEquipments() {
      const restConfig = {
        basePath: this.basePath || null,
      };
      if (this.apiToken) {
        restConfig.headers = { "mx-api-token": this.apiToken };
      }

      return new Promise((resolve, reject) => {
        this.rest
          .get("/mxc/equipments", restConfig)
          .then((res) => {
            if (Array.isArray(res.data) && res.data.length > 0) {
              resolve(res.data);
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    showTagList(event) {
      this.getEquipments().then((resdata) => {
        this.$mdDialog
          .show({
            templateUrl: "sanji-tag-selector-list.tpl.html",
            controller: TagListController,
            controllerAs: "$ctrl",
            bindToController: true,
            targetEvent: event,
            locals: {
              devices: resdata,
              data: this.data || [],
              isSparkplug: this.isSparkplug || false,
            },
            clickOutsideToClose: true,
          })
          .then((data) => {
            this.onUpdate({
              $event: {
                data,
              },
            });
          });
      });
    }
  },
};

export default TagSelectorComponent;
