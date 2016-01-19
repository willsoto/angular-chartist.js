# angular-chartist.js

[![Bower Version](https://img.shields.io/bower/v/ng-chartistjs.svg?style=flat)](https://github.com/paradox41/angular-chartist.js)
[![npm Version](https://img.shields.io/npm/v/angular-chartist.js.svg?style=flat)](https://github.com/paradox41/angular-chartist.js)
[![npm installs](https://img.shields.io/npm/dm/angular-chartist.js.svg?style=flat)](https://github.com/paradox41/angular-chartist.js)
[![Travis CI](https://api.travis-ci.org/paradox41/angular-chartist.js.svg)](https://travis-ci.org/paradox41/angular-chartist.js)
[![David](https://david-dm.org/paradox41/angular-chartist.js.svg)](https://github.com/paradox41/angular-chartist.js)
[![devDependency Status](https://david-dm.org/paradox41/angular-chartist.js/dev-status.svg)](https://david-dm.org/paradox41/angular-chartist.js#info=devDependencies)

Angular directive for [Chartist.js](http://gionkunz.github.io/chartist-js/)

*Formerly known as ng-chartist.js*

[http://paradox41.github.io/angular-chartist.js](http://paradox41.github.io/angular-chartist.js)

## Installation

Install via `bower`

```
bower install angular-chartist.js --save
```

Install via `npm`

```
npm install angular-chartist.js --save
```

## Usage

Make sure you have loaded the necessary scripts in the correct order.
Add `angular-chartist` as a module dependency, like so:

```js
var app = angular.module('app', ['angular-chartist']);
```

> Please note: if you were using this prior to 2.0, the module name was `ngChartist`.

In your HTML, add the `chartist` directive to any `div` or make it a custom element:

```html
<chartist class="ct-chart" chartist-data="chartist.barData" chartist-chart-type="Bar"></chartist>
```

Ensure that you also have, at the very least, the `ct-chart` class on the element and that you provide
the `chartist-data` and `chartist-chart-type` attributes.

All attributes are namespaced under `chartist`

Possible attributes:

- `chartist-data` (required)
- `chartist-chart-type` (required): The chart type should start with a capital letter
- `chartist-events` (optional): An object containing `key:value` pairs in the following format:
```js
{
  event: function eventHandler(obj) {
    // do stuff on event
  }
}
```
- `chartist-chart-options` (optional)
- `chartist-responsive-options` (optional)


For the sorts of values these options accept, check out the [Chartist.js docs](http://gionkunz.github.io/chartist-js/api-documentation.html)

## Issues?

This directive is simply a wrapper, anything you pass to the directive gets passed right through to the appropriate method
on the Chartist side. Any issues with the charts, data, options, etc, should be filed against [Chartist.js](https://github.com/gionkunz/chartist-js)

Feel free to file an issue / PR if you feel that the directive can be improved in some way though.
