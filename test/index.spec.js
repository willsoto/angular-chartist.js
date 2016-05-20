import angular from 'angular';
import 'angular-mocks';

import { expect } from 'chai';

import angularChartist from '../src/angular-chartist';

describe('angular-chartist', function() {
  var $rootScope;
  var $compile;
  var $scope;

  beforeEach(angular.mock.module(angularChartist.name));

  beforeEach(angular.mock.inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  var templates = {
    'default': {
      scope: {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
          ]
        },
        chartType: 'Bar'
      },
      element: '<chartist id="chartist" chartist-data="data" chartist-chart-type="{{chartType}}"></chartist>'
    }
  };

  function compileDirective(template) {
    $scope = $rootScope.$new();

    template = template ? templates[template] : templates['default'];

    angular.extend($scope, template.scope || templates['default'].scope);

    var $element = $compile(template.element)($scope);

    $rootScope.$digest();

    return $element;
  }

  it('should contain data and chartType', function() {
    compileDirective();
    var defaultScope = templates['default'].scope;

    expect($scope.data).to.exist.and.to.equal(defaultScope.data);

    expect($scope.chartType).to.exist.and.to.equal(defaultScope.chartType);
  });

  it('should correctly handle updates to data', function() {
    compileDirective();

    $scope.data = {
      labels: [],
      series: []
    };

    expect($scope.data).to.exist.and.to.not.equal(templates['default'].scope.data);
    expect($scope.data.labels).to.have.length(0);
    expect($scope.data.series).to.have.length(0);
  });
});
