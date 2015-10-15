export default formlyConfig => {
  formlyConfig.setType({
    name: 'input',
    template: `<input ng-model="model[options.key]">`
  });

  formlyConfig.setType({
    name: 'mdRadioButton',
    template: `<md-radio-button ng-repeat="item in to.options track by $index" ng-value="item.value">
                {{item.label}}
              </md-radio-button>`
  });

  formlyConfig.setType({
    name: 'mdDatepicker',
    template: `<md-datepicker name="dateField"
                ng-model="model[options.key]"
                md-placeholder="{{to.placeholder}}"
                md-min-date="to.minDate"
                md-max-date="to.maxDate"
                ng-required="to.isRequired"></md-datepicker>`
  });

  formlyConfig.setType({
    name: 'mdOption',
    template: `<md-option ng-repeat="item in to.options track by $index" ng-value="item.value">
                {{item.label}}
              </md-option>`
  });

  formlyConfig.setType({
    name: 'mdCheckbox',
    template: `<md-checkbox ng-model="model[options.key]">
                {{to.label}}
              </md-checkbox>`
  });

  formlyConfig.setWrapper({
    name: 'mdLabel',
    types: ['input'],
    template: `<label>{{to.label}}</label>
              <formly-transclude></formly-transclude>`
  });

  formlyConfig.setWrapper({
    name: 'mdRadioGroup',
    types: ['mdRadioButton'],
    template: `<md-radio-group ng-model="model[options.key]">
                <formly-transclude></formly-transclude>
              </md-radio-group>`
  });

  formlyConfig.setWrapper({
    name: 'mdSelect',
    types: ['mdOption'],
    template: `<md-select ng-model="model[options.key]">
                <formly-transclude></formly-transclude>
              </md-select>`
  });

  formlyConfig.setWrapper({
    name: 'mdInputContainer',
    types: ['input'],
    template: `<md-input-container>
                <formly-transclude></formly-transclude>
              </md-input-container>`
  });
}
