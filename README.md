# ng-chartist.js

Angular directive for Chartist.js

## Installation

Install via `bower`

```
bower install ng-chartistjs --save
```

## Usage

Make sure you have loaded the necessary scripts in the correct order.
Add `ngChartist` as a module dependency, like so:

```js
var module = angular.module('app', ['ngChartist']);
```

In your HTML, add the `chartist` directive to any `div` or make it a custom element:

```html
<chartist class="ct-chart" chartist-data="chartist.barData" chartist-chart-type="Bar"></chartist>
```

Ensure that you also have, at the very least, the `ct-chart` class on the element and that you provide
the `chartist-data` and `chartist-chart-type` attributes.

All attributes are namespaced under `chartist`

Possible attributes:

1. `chartist-data` (required)
2. `chartist-chart-type` (required): The chart type should start with a capital letter
3. `chartist-chart-options` (optional)
4. `chartist-responsive-options` (optional)

For the sorts of values these options accept, check out the [Chartist.js docs](http://gionkunz.github.io/chartist-js/api-documentation.html)

## Issues?

This directive is simply a wrapper, anything you pass to the directive gets passed right through to the appropriate method
on the Chartist side. Any issues with the charts, data, options, etc, should be filed against [Chartist.js](https://github.com/gionkunz/chartist-js)

Feel free to file an issue / PR if you feel that the directive can be improved in some way though.
