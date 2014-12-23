'use strict';

var angularChartist = angular.module('angular-chartist', []);

var bindEvents = function(chart, events) {
    Object.keys(events).forEach(function(eventName) {
        chart.on(eventName, events[eventName]);
    });
};

var renderChart = function(type, element, data, options, responsiveOptions) {
    return Chartist[type](element, data, options, responsiveOptions);
};

angularChartist.directive('chartist', [
    function() {
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
            link: function(scope, element, attrs) {
                var data = scope.data();
                var type = scope.chartType;

                var events = scope.events() || {};
                var options = scope.chartOptions() || null;
                var responsiveOptions = scope.responsiveOptions() || null;

                var elm = element[0];

                var chart = renderChart(type, elm, data, options, responsiveOptions);

                bindEvents(chart, events);

                // Deeply watch the data and create a new chart if data is updated
                scope.$watch(scope.data, function(newData, oldData) {
                    // Avoid initializing the chart twice
                    if (newData !== oldData) {
                        chart.detach();
                        chart = renderChart(type, elm, data, options, responsiveOptions);
                        bindEvents(chart, events);
                    }
                }, true);
            }
        };
    }
]);
