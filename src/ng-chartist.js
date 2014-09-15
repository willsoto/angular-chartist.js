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

                Chartist[type](element[0], data, options, responsiveOptions);
            }
        };
    }
]);
