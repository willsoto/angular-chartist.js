'use strict';

var angularChartist = angular.module('angular-chartist', []);

function AngularChartistCtrl($scope) {
    this.data = $scope.data();
    this.chartType = $scope.chartType;

    this.events = $scope.events() || {};
    this.options = $scope.chartOptions() || null;
    this.responsiveOptions = $scope.responsiveOptions() || null;
}

AngularChartistCtrl.prototype.bindEvents = function(chart) {
    Object.keys(this.events).forEach(function(eventName) {
        chart.on(eventName, this.events[eventName]);
    }, this);
};

AngularChartistCtrl.prototype.renderChart = function(element, chartType) {
    if (chartType) {
        this.chartType = chartType;
    }

    return Chartist[this.chartType](element, this.data, this.options, this.responsiveOptions);
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
            controller: [
                '$scope',
                AngularChartistCtrl
            ],
            link: function(scope, element, attrs, Ctrl) {
                var elm = element[0];
                var chart = Ctrl.renderChart(elm);

                Ctrl.bindEvents(chart);

                // Deeply watch the data and create a new chart if data is updated
                scope.$watchGroup(['data', 'chartType'], function(newDataArray, oldDataArray) {
                    // new data object
                    var newData = newDataArray[0];
                    var oldData = oldDataArray[0];

                    // new chart type
                    var newChartType = newDataArray[1];
                    var oldChartType = oldDataArray[1];

                    // Avoid initializing the chart twice
                    if (newData !== oldData) {
                        chart.update(newData);
                    } else if (newChartType !== oldChartType) {
                        chart = Ctrl.renderChart(elm, newChartType);
                    }

                }, true);
            }
        };
    }
]);
