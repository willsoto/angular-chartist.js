/* global angular */
(function(angular) {
    'use strict';

    var module = angular.module('app', ['ngChartist']);

    module.controller('ChartistExampleCtrl', [

        function() {
            this.barData = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                series: [
                    [5, 2, 4, 2, 0]
                ]
            };
        }
    ]);

})(angular);
