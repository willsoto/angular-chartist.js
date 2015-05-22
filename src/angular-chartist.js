/* global angular, Chartist */
'use strict';

class AngularChartistCtrl {
    constructor($scope) {
        this.data = $scope.data();
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;
    }

    bindEvents(chart) {
        Object.keys(this.events).forEach((eventName) => {
            chart.on(eventName, this.events[eventName]);
        });
    }

    renderChart(element) {
        return Chartist[this.chartType](element, this.data, this.options, this.responsiveOptions);
    }
}

AngularChartistCtrl.$inject = ['$scope'];

function AngularChartistLink(scope, element, attrs, Ctrl) {
    var elm = element[0];
    var chart = Ctrl.renderChart(elm);

    Ctrl.bindEvents(chart);

    scope.$watch(function() {
        return {
            data: scope.data(),
            chartType: scope.chartType,
            chartOptions: scope.chartOptions()
        };
    }, function(newConfig, oldConfig) {
        // Update controller with new configuration
        Ctrl.chartType = newConfig.chartType;
        Ctrl.data = newConfig.data;
        Ctrl.options = newConfig.chartOptions;

        // If chart type changed we need to recreate whole chart, otherwise we can update
        if (newConfig.chartType !== oldConfig.chartType) {
            chart = Ctrl.renderChart(elm);
        } else {
            chart.update(Ctrl.data, Ctrl.options);
        }
    }, true);

    scope.$on('$destroy', function() {
        chart.detach();
    });
}

function AngularChartistDirective() {
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
        controller: AngularChartistCtrl,
        link: AngularChartistLink
    };
}

AngularChartistDirective.$inject = [];

var angularChartist = angular.module('angular-chartist', [])

.directive('chartist', AngularChartistDirective);
