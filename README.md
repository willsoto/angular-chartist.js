# angular-chartist.js

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![devDependency Status][devstat-image]][devstat-url]
[![Downloads][download-badge]][npm-url]

Angular 1.x directive for [Chartist.js](http://gionkunz.github.io/chartist-js/)

[Looking for the Angular 2 version?](https://github.com/paradox41/angular2-chartist)

## Installation

```
npm install angular-chartist.js chartist angular --save
```

For package managers other than NPM, you can install via the git url:

For example, with Bower:
```
bower install 'https://github.com/paradox41/angular-chartist.js.git#<tag>' --save
```

## Usage

Make sure you have loaded the necessary scripts in the correct order.
Add `angular-chartist` as a module dependency, like so:

```js
// >= 4.1
import angular from 'angular';
import angularChartist from 'angular-chartist.js';

angular.module('app', [
  angularChartist
]);
```

```js
// <= 4.0
import angular from 'angular';
import angularChartist from 'angular-chartist.js';

angular.module('app', [
  angularChartist.name
]);
```

In your HTML, add the `chartist` directive to any `div` or make it a custom element:

```html
<chartist class="ct-chart" chartist-data="chartist.barData" chartist-chart-type="Bar"></chartist>
```

| Attribute | Type | Required |
| ------------- | ------------- | ------------- |
| `chartist-data` | Object  | Yes |
| `chartist-chart-type` | String  | Yes |
| `chartist-events`* | Object  | No |
| `chartist-chart-options` | Object  | No |
| `chartist-responsive-options` | Array  | No |

Format for Chartist events:
```js
{
  event: function eventHandler(obj) {
    // do stuff on event
  }
}
```

For the sorts of values these options accept, check out the [Chartist.js docs](http://gionkunz.github.io/chartist-js/api-documentation.html)

## Using Plugins

Simply put the plugins array in the `options` object.

Example:

```js
$scope.chartOptions = {
    plugins: [
        ctPointLabels({
          textAnchor: 'middle'
        })
    ]
};
```

## Issues?

This directive is simply a wrapper, anything you pass to the directive gets passed right through to the appropriate method
on the Chartist side. Any issues with the charts, data, options, etc, should be filed against [Chartist.js](https://github.com/gionkunz/chartist-js)

Feel free to file an issue / PR if you feel that the directive can be improved in some way though.

[npm-url]: https://npmjs.org/package/angular-chartist.js
[npm-image]: https://img.shields.io/npm/v/angular-chartist.js.svg?style=flat-square

[travis-url]: https://travis-ci.org/paradox41/angular-chartist.js
[travis-image]: https://img.shields.io/travis/paradox41/angular-chartist.js.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/paradox41/angular-chartist.js
[coveralls-image]: https://img.shields.io/coveralls/paradox41/angular-chartist.js.svg?style=flat-square

[depstat-url]: https://david-dm.org/paradox41/angular-chartist.js
[depstat-image]: https://david-dm.org/paradox41/angular-chartist.js.svg?style=flat-square

[devstat-url]: https://david-dm.org/paradox41/angular-chartist.js#info=devDependencies
[devstat-image]: https://david-dm.org/paradox41/angular-chartist.js/dev-status.svg

[download-badge]: http://img.shields.io/npm/dm/angular-chartist.js.svg?style=flat-square
