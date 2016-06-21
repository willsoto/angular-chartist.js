import angular from 'angular';
import 'angular-mocks';

import { expect } from 'chai';

import angularChartist from '../dist/angular-chartist';

const templates = {
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
    element: '<chartist id="chartist" chartist-data="data" chartist-chart-type="Bar"></chartist>'
  }
};

describe('angular-chartist', function() {
  beforeEach(angular.mock.module(angularChartist));

  beforeEach(angular.mock.inject(function($injector) {
    this.$scope = $injector.get('$rootScope');
    this.$compile = $injector.get('$compile');

    this.compileDirective = (template = 'default') => {
      const selectedTemplate = templates[template];

      this.$scope = Object.assign(this.$scope, selectedTemplate.scope);

      const element = this.$compile(selectedTemplate.element)(this.$scope);

      this.$scope.$digest();

      return element;
    };
  }));

  it('should correctly export itself', function() {
    expect(angularChartist).to.equal('angular-chartist');
  });

  it('should contain data and chartType', function() {
    const element = this.compileDirective();
    const scope = element.isolateScope();
    const defaultChart = templates['default'].scope;

    expect(scope.data).to.exist.and.to.equal(defaultChart.data);
    expect(scope.chartType).to.exist.and.to.equal(defaultChart.chartType);
  });

  it('should correctly handle updates to data', function() {
    const element = this.compileDirective();
    const scope = element.isolateScope();

    scope.data = {
      labels: [],
      series: []
    };

    expect(scope.data).to.exist.and.to.not.equal(templates['default'].scope.data);
    expect(scope.data.labels).to.be.empty;
    expect(scope.data.series).to.be.empty;
  });
});
