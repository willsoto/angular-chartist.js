/*global angular, Chartist*/

class AngularChartistCtrl {
    constructor($scope, $element) {
        this.data = $scope.data;
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;

        this.element = $element[0];

        this.renderChart();

        $scope.$watch(() => {
            return {
                data: $scope.data,
                chartType: $scope.chartType,
                chartOptions: $scope.chartOptions()
            };
        }, this.update.bind(this), true);

        $scope.$on('$destroy', () => {
            if (this.chart) {
                this.chart.detach();
            }
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

            this.bindEvents();

            return this.chart;
        }
    }

    update(newConfig, oldConfig) {
        // Update controller with new configuration
        this.chartType = newConfig.chartType;
        this.data = newConfig.data;
        this.options = newConfig.chartOptions;

        // If chart type changed we need to recreate whole chart, otherwise we can update
        if (!this.chart || newConfig.chartType !== oldConfig.chartType) {
            this.renderChart();
        } else {
            this.chart.update(this.data, this.options);
        }
    }
}

AngularChartistCtrl.$inject = ['$scope', '$element'];

function chartistDirective() {
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
        controller: 'AngularChartistCtrl'
    };
}

chartistDirective.$inject = [];

/*eslint-disable no-unused-vars */
var angularChartist = angular.module('angular-chartist', [])

.controller('AngularChartistCtrl', AngularChartistCtrl)

.directive('chartist', chartistDirective);
/*eslint-enable no-unused-vars */
