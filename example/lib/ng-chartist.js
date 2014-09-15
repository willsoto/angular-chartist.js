(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["angular", "chartist"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('chartist'));
    } else {
        root.gulpWrapUmd = factory(root.angular, root.Chartist);
    }
}(this, function (angular, Chartist) {

    'use strict';

    var module = angular.module('ngChartist', []);

    module.directive('chartist', [

    function () {
        return {
            restrict: 'EA',
            scope: {
                data: '=chartistData',
                chartType: '@chartistChartType',
                chartOptions: '=chartistChartOptions',
                responsiveOptions: '=chartistResponsiveOptions'
            },
            link: function (scope, element, attrs) {
                var data = scope.data;
                var type = scope.chartType;
                var options = scope.chartOptions || null;
                var responsiveOptions = scope.responsiveOptions || null;

                Chartist[type](element[0], data, options, responsiveOptions);
            }
        };
    }]);

    return module;

}));