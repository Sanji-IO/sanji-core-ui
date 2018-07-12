# sanji-core-ui
> Sanji core module is part of Sanji UI framework and also it is a angular
module. It is responsible for config all webapp services.

[sanji-core-ui-icon]: https://nodei.co/npm/sanji-core-ui.png?downloads=true
[sanji-core-ui-url]: https://npmjs.org/package/sanji-core-ui
[travis-build-badge]: https://travis-ci.org/Sanji-IO/sanji-core-ui.svg?branch=master
[travis-build-url]: https://travis-ci.org/Sanji-IO/sanji-core-ui
[dependencies-image]: https://david-dm.org/Sanji-IO/sanji-core-ui.png
[dependencies-url]: https://david-dm.org/Sanji-IO/sanji-core-ui
[devdependencies-image]: https://david-dm.org/Sanji-IO/sanji-core-ui/dev-status.png
[devdependencies-url]: https://david-dm.org/Sanji-IO/sanji-core-ui#info=devDependencies
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[![NPM][sanji-core-ui-icon]][sanji-core-ui-url]
[![Build Status][travis-build-badge]][travis-build-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][devdependencies-image]][devdependencies-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]

## Dependencies
- [angularjs](https://github.com/angular/angular.js)
- [angular-sanitize](https://github.com/angular/bower-angular-sanitize)
- [angular-translate](https://github.com/angular-translate/angular-translate)
- [angular-material](https://github.com/angular/material)
- [angular-material-icons](https://github.com/klarsys/angular-material-icons)
- [angular-ui-router](https://github.com/angular-ui/ui-router)
- [angular-formly](https://github.com/formly-js/angular-formly)
- [angular-sanji-window](https://github.com/Sanji-IO/angular-sanji-window/tree/webpack-sanji-window)
- [ocLazyLoad](https://github.com/ocombe/ocLazyLoad)
- [lodash](https://github.com/lodash/lodash)
- [api-check](https://github.com/kentcdodds/api-check)
- [sanji-utils-ui](https://github.com/Sanji-IO/sanji-utils-ui)

## Installation
```shell
npm install sanji-core-ui --save
```

```javascript
let app = angular.module('webapp', ['sanji.core']);
```

## Form Config
sanji-core-ui define some basic form fields through [angular-formly](https://github.com/formly-js/angular-formly).

### Define Config
- **key**(*required*): this is field uniq id.
- **type**(*required*): this is field type.
- **templateOptions**(*optional*): this is for setting field property.

example:
```javascript
[{
  "key": "ip",
  "type": "input",
  "templateOptions": {
    "label": "IP",
    "required": true
  }
}]
```

### Build-in Field Type

Type name: `realtime_info`
templateOptions:
- **event**: event name for subscribing data which push from server to client.
- **label**: label name

> Note: Server need to send data which matching following format:
```
{
  data: {
    value: '32 MB'
  },
  event: 'realtime:info'
}
```

Type name: `cloud_connection`
templateOptions:
- **event**: event name for subscribing data which push from server to client.

> Note: Server need to send data which matching following format:
```
{
  data: {
    status: true
  },
  event: 'cloud:connection'
}
```

Type name: `tag_selector`
templateOptions:
- **basePath**: client request url base path.
- **apiToken**: API token string.

Type name: `input`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `password`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `url`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `email`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `range`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **min**: minimum value.
- **max**: maximum value.

Type name: `file`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **accept**: accept file pattern, like `image/*`.
- **maxSize**: file size limitation, like `10MB`.

Type name: `date`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **min**: minimum date value.
- **max**: maximum date value.

Type name: `datetime`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **min**: minimum date value(ISO8601).
- **max**: maximum date value(ISO8601).

Type name: `number`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.
- **min**: minimum value.
- **max**: maximum value.

Type name: `radio`
templateOptions:
- **options**: radio option array, like `[{label: 'foo', value: 'bar'}]`.

Type name: `radio_label`
templateOptions:
- **label**: label name.
- **options**: radio option array, like `[{label: 'foo', value: 'bar'}]`.

Type name: `empty`
templateOptions:
- **divider**: value is `true` or `false`.

Type name: `datepicker`
templateOptions:
- **required**: value is `true` or `false`.
- **placeholder**: placeholder string.
- **min**: minimum date value.
- **max**: maximum date value.

Type name: `select`
templateOptions:
- **options**: select option array, like `[{label: 'foo', value: 'bar'}]`.

Type name: `checkbox`
templateOptions:
- **label**: label name.

Type name: `ip`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `latitude`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `longitude`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `aliasName`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `hostname`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `port`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `mac`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

Type name: `float`
templateOptions:
- **required**: value is `true` or `false`.
- **label**: label name.
- **placeholder**: placeholder string.

## Contact

Author: Zack Yang &copy; 2015

* [@zack9433](https://twitter.com/zack9433)

Support: if you find any problems with this library,
[open issue](https://github.com/Sanji-IO/sanji-core-ui/issues) on Github

