(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["angular", "chartist"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('chartist'));
    } else {
        root.angularChartist = factory(root.angular, root.Chartist);
    }
}(this, function (angular, Chartist) {

    'use strict';

    var angularChartist = angular.module('angular-chartist', []);

    var bindEvents = function (chart, events) {
        Object.keys(events).forEach(function (eventName) {
            chart.on(eventName, events[eventName]);
        });
    };

    angularChartist.directive('chartist', [

    function () {
        return {
            restrict: 'EA',
            scope: {
                // mandatory
                data: '&chartistData',
                chartType: '@chartistChartType',
                // optional
                events: '&chartistEvents',
                chartOptions: '&chartistChartOptions',
                responsiveOptions: '&chartistResponsiveOptions'
            },
            link: function (scope, element, attrs) {
                var data = scope.data();
                var type = scope.chartType;

                var events = scope.events() || {};
                var options = scope.chartOptions() || null;
                var responsiveOptions = scope.responsiveOptions() || null;

                var chart = Chartist[type](element[0], data, options, responsiveOptions);

                bindEvents(chart, events);

                // Deeply watch the data and create a new chart if data is updated
                scope.$watch(scope.data, function (newData, oldData) {
                    // Avoid initializing the chart twice
                    if (newData !== oldData) {
                        chart.detach();
                        chart = Chartist[type](element[0], newData, options, responsiveOptions);
                        bindEvents(chart, events);
                    }
                }, true);
            }
        };
    }]);

    return angularChartist;

}));