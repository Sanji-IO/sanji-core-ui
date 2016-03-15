const types = [
  {
    name: 'datetimepicker',
    template: `<div layout>
                <md-datepicker style="margin-top: 15px;"
                  ng-model="to.date"
                  md-placeholder="{{to.datePlaceholder | translate}}"
                  ng-required="to.required"></md-datepicker>
                <md-input-container flex>
                  <label translate="{{to.hourLabel}}"></label>
                  <input type="number" ng-model="to.hour" ng-required="to.required">
                </md-input-container>
                <md-input-container flex>
                  <label translate="{{to.minLabel}}"></label>
                  <input type="number" ng-model="to.minute" ng-required="to.required">
                </md-input-container>
              </div>`,
    controller: function($scope) {
      let date = new Date($scope.model[$scope.options.key]);
      $scope.options.templateOptions.date = date;
      $scope.options.templateOptions.hour = date.getHours();
      $scope.options.templateOptions.minute = date.getMinutes();
      $scope.$watchGroup([
        'options.templateOptions.date',
        'options.templateOptions.hour',
        'options.templateOptions.minute'
      ], (newVals, oldVals, scope) => {
        let date = newVals[0];
        if (date) {
          date.setHours(newVals[1]);
          date.setMinutes(newVals[2]);
          scope.model[scope.options.key] = date;
        }
      });
    },
    defaultOptions: {
      templateOptions: {
        datePlaceholder: 'FORM_PLACEHOLDER_SELECT_DATE',
        hourLabel: 'FORM_LABEL_HOUR',
        minLabel: 'FORM_LABEL_MINUTE'
      }
    }
  },
  {
    name: 'textarea',
    template: `<textarea ng-model="model[options.key]"
                rows="{{to.rows}}" columns="{{to.columns}}"></textarea>`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_TEXTAREA'
      }
    }
  },
  {
    name: 'switch',
    template: `<md-switch class="md-primary"
                aria-label="Switch"
                ng-model="model[options.key]">
                  <span translate="{{to.label}}"></span>
              </md-switch>`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_SWITCH'
      }
    }
  },
  {
    name: 'url',
    template: `<input type="url" ng-model="model[options.key]">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_URL'
      },
      validation: {
        messages: {
          url: '"FORM_URL_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'range',
    template: `<md-slider
              style="padding: 0 20px;"
              ng-model="model[options.key]"
              ng-min="to.min"
              ng-max="to.max"
              aria-label="slider"
              class="md-primary"></md-slider>`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_RANGE'
      }
    }
  },
  {
    name: 'input',
    template: `<input ng-model="model[options.key]">`,
    defaultOptions: {
      templateOptions: {
        label: ''
      }
    }
  },
  {
    name: 'file',
    template: `<div layout>
                <md-input-container style="width: 70%;">
                  <label>{{to.label}}</label>
                  <input style="color: rgba(0,0,0,0.87);" ng-model="model[options.key]" readonly>
                </md-input-container>
                <md-input-container>
                  <md-button class="md-raised" ngf-select"$fileSelect($file, options.key)"
                   accept="{{to.accept}}" ngf-max-size="{{to.maxSize}}">
                    <span translate="FORM_SELECT_BUTTON"></span>
                  </md-button>
                </md-input-container>
              </div>`,
    controller: function($scope) {
      $scope.$fileSelect = (file, key) => {
        $scope.model[key] = file.name;
        if (undefined === $scope.formOptions.files) {
          $scope.formOptions.files = [];
          $scope.formOptions.files.push({key: key, file: file});
        }
        else {
          $scope.formOptions.files.push({key: key, file: file});
        }
      };
    },
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_FILE'
      }
    }
  },
  {
    name: 'date',
    template: `<input type="date" ng-model="model[options.key]" ng-min="to.min" ng-max="to.max">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_DATE'
      }
    }
  },
  {
    name: 'datetime',
    template: `<input type="datetime-local" ng-model="model[options.key]" ng-min="to.min" ng-max="to.max">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_DATE_TIME'
      }
    }
  },
  {
    name: 'email',
    template: `<input type="email" ng-model="model[options.key]">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_EMAIL'
      },
      validation: {
        messages: {
          email: '"FORM_EMAIL_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'number',
    template: `<input type="number" ng-model="model[options.key]" min="{{to.min}}" max="{{to.max}}">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_NUMBER',
        min: -65535,
        max: 65535
      }
    }
  },
  {
    name: 'radio',
    template: `<md-radio-group ng-model="model[options.key]">
                  <md-radio-button class="md-primary" aria-label="{{item.label}}"
                  ng-repeat="item in to.options track by $index"
                  ng-value="item.value">
                    <span translate="{{item.label}}"></span>
                  </md-radio-button>
              </md-radio-group>`,
    defaultOptions: {
      templateOptions: {
        options: [
          {
            label: 'FORM_LABEL_RADIO_OPTION',
            value: ''
          }
        ]
      }
    }
  },
  {
    name: 'datepicker',
    template: `<md-datepicker
                ng-model="model[options.key]"
                md-placeholder="{{to.placeholder}}"
                md-min-date="to.min"
                md-max-date="to.max"
                ng-required="to.required"></md-datepicker>`
  },
  {
    name: 'select',
    template: `<md-option
                ng-repeat="item in to.options track by $index"
                ng-value="item.value || item">
                  <span translate="{{item.label || item}}"></span>
                </md-option>`,
    defaultOptions: {
      templateOptions: {
        options: [
          {
            label: 'FORM_LABEL_SELECT_OPTION',
            value: ''
          }
        ]
      }
    }
  },
  {
    name: 'checkbox',
    template: `<md-checkbox ng-model="model[options.key]">
                <span translate="{{to.label}}"></span>
              </md-checkbox>`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_CHECKBOX'
      }
    }
  },
  {
    name: 'ip',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_IP',
        placeholder: '127.0.0.1'
      },
      validators: {
        ip: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateIp(value);
          },
          message: '"FORM_IP_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'latitude',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_LATITUDE'
      },
      validators: {
        latitude: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateLatitude(value);
          },
          message: '"FORM_LATITUDE_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'longitude',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_LONGITUDE'
      },
      validators: {
        longitude: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateLongitude(value);
          },
          message: '"FORM_LONITUDE_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'password',
    template: `<input type="password" ng-model="model[options.key]">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_PASSWORD'
      },
      validators: {
        password: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validatePassword(value);
          },
          message: '"FORM_PASSWORD_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'aliasName',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_NAME'
      },
      validators: {
        aliasName: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateAliasName(value);
          },
          message: '"FORM_ALIASNAME_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'hostname',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_HOSTNAME'
      },
      validators: {
        hostname: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateHostName(value);
          },
          message: '"FORM_HOSTNAME_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'port',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_PORT'
      },
      validators: {
        port: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validatePort(value);
          },
          message: '"FORM_PORT_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'mac',
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_MAC'
      },
      validators: {
        mac: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateMac(value);
          },
          message: '"FORM_MAC_ERROR_MSG"'
        }
      }
    }
  },
  {
    name: 'float',
    template: `<input type="number" step="any" ng-model="model[options.key]" min="{{to.min}}" max="{{to.max}}">`,
    defaultOptions: {
      templateOptions: {
        label: 'FORM_LABEL_FLOAT',
        min: -65535,
        max: 65535
      },
      validators: {
        float: {
          expression: function($viewValue, $modelValue) {
            var value = $modelValue || $viewValue;
            return !value || validateFloat(value);
          },
          message: '"FORM_FLOAT_ERROR_MSG"'
        }
      }
    }
  }
];

const wrappers = [
  {
    name: 'mdLabel',
    types: ['input', 'number', 'date', 'datetime', 'email', 'password', 'range', 'url', 'float', 'textarea'],
    template: `<label translate="{{to.label}}"></label>
              <formly-transclude></formly-transclude>`
  },
  {
    name: 'mdSelect',
    types: ['select'],
    template: `<md-input-container class="md-block">
                <label translate="{{to.label}}"></label>
                <md-select ng-model="model[options.key]" aria-label="select" ng-required="{{to.required}}">
                  <formly-transclude></formly-transclude>
                </md-select>
                <div ng-messages="fc.$error" ng-show="showError">
                  <div ng-repeat="(name, message) in options.validation.messages"
                  ng-message="{{name}}">
                    {{message(fc.$viewValue, fc.$modelValue, this) | translate:options}}
                  </div>
                </div>
              </md-input-container>`
  },
  {
    name: 'mdInputContainer',
    types: ['input', 'number', 'date', 'datetime', 'email', 'password', 'file', 'url', 'float', 'textarea'],
    template: `<md-input-container class="md-block">
                <formly-transclude></formly-transclude>
                <div ng-messages="fc.$error" ng-show="showError">
                  <div ng-repeat="(name, message) in options.validation.messages"
                  ng-message="{{name}}">
                    {{message(fc.$viewValue, fc.$modelValue, this) | translate:options}}
                  </div>
                </div>
              </md-input-container>`
  }
];


function validateFloat(value) {
  return /^[+-]?\d+(\.\d+)?$/.test(value);
}

function validateMac(value) {
  return /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/.test(value);
}

function validatePort(value) {
  return /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(value);
}

function validateHostName(value) {
  return /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/.test(value);
}

function validateAliasName(value) {
  return /^[A-Za-z0-9_-]{3,255}$/.test(value);
}

function validateUrl(value) {
  return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value);
}

function validateLatitude(value) {
  return /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value);
}

function validateLongitude(value) {
  return /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(value);
}

function validatePassword(value) {
  return /^(?=.*\d)(?=.*[a-zA-Z]).{6,100}$/.test(value);
}

function validateIp(value) {
  if ('0.0.0.0' === value) {
    return false;
  }
  // Check ip format
  if (!(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value))) {
    return false;
  }
  else {
    // Check multicast IP, e.g. 224.0.0.1, 239.255.255.255
    if ((/2(?:2[4-9]|3\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)){3}/.test(value))) {
      return false;
    }
    else {
      return true;
    }
  }
}

function setType(formlyConfig, types) {
  let i;
  let length = types.length;
  for (i = 0; i < length; i++) {
    formlyConfig.setType(types[i]);
  }
}

function setWrapper(formlyConfig, wrappers) {
  let i;
  let length = wrappers.length;
  for (i = 0; i < length; i++) {
    formlyConfig.setWrapper(wrappers[i]);
  }
}

export default app => {
  app.config(formlyConfigProvider => {
    formlyConfigProvider.disableWarnings = __RELEASE__;
    formlyConfigProvider.extras.removeChromeAutoComplete = true;
    formlyConfigProvider.extras.explicitAsync = true;
    formlyConfigProvider.extras.ngModelAttrsManipulatorPreferBound = true;
  });
  app.run((formlyConfig, formlyValidationMessages) => {
    setType(formlyConfig, types);
    setWrapper(formlyConfig, wrappers);
    formlyValidationMessages.addStringMessage('required', 'FORM_REQUIRED_ERROR_MSG');
    formlyValidationMessages.addTemplateOptionValueMessage('min', 'min', '', 'FORM_MIN_ERROR_MSG2', 'FORM_MIN_ERROR_MSG');
    formlyValidationMessages.addTemplateOptionValueMessage('max', 'max', '', 'FORM_MAX_ERROR_MSG2', 'FORM_MAX_ERROR_MSG');
    formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'FORM_MINLEN_ERROR_MSG2', 'FORM_MINLEN_ERROR_MSG');
    formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'FORM_MAXLEN_ERROR_MSG2', 'FORM_MAXLEN_ERROR_MSG');
    formlyValidationMessages.addTemplateOptionValueMessage('pattern', 'patternValidationMessage', '', '', 'FORM_PATTERN_ERROR_MSG');
  });
}
