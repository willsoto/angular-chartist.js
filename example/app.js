(function(angular) {
    'use strict';

    var module = angular.module('app', ['angular-chartist']);

    module.controller('ChartistExampleCtrl', ['$scope', '$interval',
        function($scope, $interval) {

            this.events = {
                draw: function(obj) {
                    // do stuff
                }
            };

            // bar chart
            this.barData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                ]
            };

            this.barOptions = {
                seriesBarDistance: 15
            };

            this.barResponsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0];
                        }
                    }
                }]
            ];

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            // line chart
            this.lineData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [0, 1, 2, 4, 7, 6, 9, 10, 8, 10, 14, 13, 16, 14, 17, 19, 20, 31, 32, 26, 36, 28, 31, 40, 26, 26, 43, 47, 55, 30],
                    [0, 1, 2, 4, 4, 6, 6, 13, 9, 10, 16, 18, 21, 16, 16, 16, 31, 17, 27, 23, 31, 29, 35, 39, 30, 32, 26, 43, 51, 46],
                    [0, 1, 3, 4, 6, 5, 11, 9, 11, 11, 13, 15, 14, 22, 20, 15, 31, 27, 25, 25, 36, 30, 37, 29, 29, 39, 40, 49, 34, 35],
                    [0, 1, 3, 5, 7, 5, 9, 9, 10, 17, 13, 21, 14, 16, 23, 23, 25, 17, 24, 34, 27, 39, 33, 45, 47, 32, 40, 36, 49, 32],
                    [0, 1, 3, 3, 7, 5, 8, 11, 12, 13, 16, 17, 20, 24, 27, 15, 22, 33, 35, 24, 32, 35, 41, 39, 24, 31, 51, 29, 45, 50]
                ]
            };

            this.lineOptions = {
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }
            };

            // pie chart
            this.pieData = {
                series: [20, 10, 30, 40]
            };

            // donut chart
            this.donutOptions = {
                donut: true
            };

            function pushLimit(arr, elem, limit) {
                arr.push(elem);
                if (arr.length > limit) {
                    arr.splice(0, 1);
                }
            }

            // Use $interval to update bar chart data
            var barUpdatePromise = $interval(function() {
                var time = new Date();

                pushLimit(this.barData.labels, [
                    time.getHours(),
                    time.getMinutes(),
                    time.getSeconds()
                ].join(':'), 12);

                this.barData.series.forEach(function(series) {
                    pushLimit(series, getRandomInt(0, 10), 12);
                });
            }.bind(this), 1000);

            // Cancel interval once scope is destroyed
            $scope.$on('$destroy', function() {
                $interval.cancel(barUpdatePromise);
            });
        }
    ]);

})(angular);
