const types = [
  {
    name: 'input',
    template: `<input ng-model="model[options.key]">`
  },
  {
    name: 'mdRadioButton',
    template: `<md-radio-button ng-repeat="item in to.options track by $index" ng-value="item.value">
                {{item.label}}
              </md-radio-button>`
  },
  {
    name: 'mdDatepicker',
    template: `<md-datepicker name="dateField"
                ng-model="model[options.key]"
                md-placeholder="{{to.placeholder}}"
                md-min-date="to.minDate"
                md-max-date="to.maxDate"
                ng-required="to.isRequired"></md-datepicker>`
  },
  {
    name: 'mdOption',
    template: `<md-option ng-repeat="item in to.options track by $index" ng-value="item.value">
                {{item.label}}
              </md-option>`
  },
  {
    name: 'mdCheckbox',
    template: `<md-checkbox ng-model="model[options.key]">
                {{to.label}}
              </md-checkbox>`
  }
];

const wrappers = [
  {
    name: 'mdLabel',
    types: ['input'],
    template: `<label>{{to.label}}</label>
              <formly-transclude></formly-transclude>`
  },
  {
    name: 'mdRadioGroup',
    types: ['mdRadioButton'],
    template: `<md-radio-group ng-model="model[options.key]">
                <formly-transclude></formly-transclude>
              </md-radio-group>`
  },
  {
    name: 'mdSelect',
    types: ['mdOption'],
    template: `<md-select ng-model="model[options.key]">
                <formly-transclude></formly-transclude>
              </md-select>`
  },
  {
    name: 'mdInputContainer',
    types: ['input'],
    template: `<md-input-container>
                <formly-transclude></formly-transclude>
              </md-input-container>`
  }
];

function setType(types) {
  let i;
  let length = types.length;
  for (i = 0; i < length; i++) {
    formlyConfig.setType(types[i]);
  }
}

function setWrapper(wrappers) {
  let i;
  let length = wrappers.length;
  for (i = 0; i < length; i++) {
    formlyConfig.setWrapper(wrappers[i]);
  }
}

export default formlyConfig => {
  setType(types);
  setWrapper(wrappers);
}
