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

                scope.$watch(function() {
                    return [scope.data(), scope.chartType];
                }, function(newConfig, oldConfig) {
                    var newData = newConfig[0];
                    var oldData = oldConfig[0];

                    var newChartType = newConfig[1];
                    var oldChartType = oldConfig[1];

                    if (newData !== oldData) {
                        chart.update(newData);
                    }

                    if (newChartType !== oldChartType) {
                        chart = Ctrl.renderChart(elm, newChartType);
                    }
                }, true);
            }
        };
    }
]);
