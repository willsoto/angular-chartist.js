/* global $, angular, Chartist */
'use strict';

describe('libraries', function() {
    it('should load Chartist into the global namespace', function() {
        expect(Chartist).to.exist();
    });
});

describe('angular-chartist', function() {
    var scope, element;

    beforeEach(module('angular-chartist'));

    beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $compile = $injector.get('$compile');

        scope = $rootScope.$new();

        scope.data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };

        scope.chartType = 'Bar';

        var elm = '<chartist id="chartist" chartist-data="data" chartist-chart-type="Bar"></chartist>';

        element = $compile(elm)(scope);

        scope.$digest();
    }));

    // it('should contain a single svg element at the root level', function() {
    //     console.log($(element).find('svg'));
    //     expect(element.find('svg')).to.have.length(1);
    // });
});
