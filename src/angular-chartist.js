/* global angular, Chartist */
'use strict';

class AngularChartistCtrl {
    constructor($scope) {
        this.data = $scope.data;
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;

        $scope.$watch(() => {
            return {
                data: $scope.data,
                chartType: $scope.chartType,
                chartOptions: $scope.chartOptions()
            };
        }, this.update.bind(this), true);

        $scope.$on('$destroy', () => {
            this.chart.detach();
        });
    }

    bindEvents() {
        Object.keys(this.events).forEach((eventName) => {
            this.chart.on(eventName, this.events[eventName]);
        });
    }

    renderChart() {
        // ensure that the chart does not get created without data
        if (this.data) {
            this.chart = Chartist[this.chartType](this.element, this.data, this.options, this.responsiveOptions);
        }
    }

    update(newConfig, oldConfig) {
        // Update controller with new configuration
        this.chartType = newConfig.chartType;
        this.data = newConfig.data;
        this.options = newConfig.chartOptions;

        // If chart type changed we need to recreate whole chart, otherwise we can update
        if (!this.chart || newConfig.chartType !== oldConfig.chartType) {
            this.renderChart(this.element);
        } else {
            this.chart.update(this.data, this.options);
        }
    }

    set element(element) {
        this._element = element;
        this.renderChart();
        this.bindEvents();
    }

    get element() {
        return this._element;
    }
}

AngularChartistCtrl.$inject = ['$scope'];

function AngularChartistDirective() {
    return {
        restrict: 'EA',
        scope: {
            // mandatory
            data: '=chartistData',
            chartType: '@chartistChartType',
            // optional
            events: '&chartistEvents',
            chartOptions: '&chartistChartOptions',
            responsiveOptions: '&chartistResponsiveOptions'
        },
        controller: 'AngularChartistCtrl',
        link: function(scope, element, attrs, Ctrl) {
            Ctrl.element = element[0];
        }
    };
}

AngularChartistDirective.$inject = [];

var angularChartist = angular.module('angular-chartist', [])

.controller('AngularChartistCtrl', AngularChartistCtrl)

.directive('chartist', AngularChartistDirective);
