/* global angular, Chartist */
'use strict';

angular.module('ngChartist', [])

.directive('chartist', [

    function() {
        return {
            restrict: 'EA',
            scope: {
                data: '=chartistData',
                chartType: '@chartistChartType',
                chartOptions: '=chartistChartOptions',
                responsiveOptions: '=chartistResponsiveOptions'
            },
            link: function(scope, element, attrs) {
                var data = scope.data || null;
                var type = scope.chartType || null;
                var options = scope.options || null;
                var responsiveOptions = scope.responsiveOptions || null;

                if (data === null) {
                    throw new Error('Data is required');
                }

                if (type === null || type === '') {
                    throw new Error('Chart type is required');
                }

                Chartist[type](element[0], data, options, responsiveOptions);
            }
        };
    }
]);
