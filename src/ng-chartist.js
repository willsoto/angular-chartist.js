'use strict';

var ngChartist = angular.module('ngChartist', []);

ngChartist.directive('chartist', [
    function() {
        return {
            restrict: 'EA',
            scope: {
                data: '&chartistData',
                chartType: '@chartistChartType',
                chartOptions: '&chartistChartOptions',
                responsiveOptions: '&chartistResponsiveOptions'
            },
            link: function(scope, element, attrs) {
                var data = scope.data();
                var type = scope.chartType;
                var options = scope.chartOptions() || null;
                var responsiveOptions = scope.responsiveOptions() || null;

                var chartist = Chartist[type](element[0], data, options, responsiveOptions);

                // Deeply watch the data and create a new chart if data is updated
                scope.$watch(scope.data, function(newData) {
                    chartist.detach();
                    chartist = Chartist[type](element[0], newData, options, responsiveOptions);
                }, true);
            }
        };
    }
]);
