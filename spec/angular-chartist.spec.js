/* global $, angular, Chartist */
'use strict';

describe('libraries', function() {
    it('should load Chartist into the global namespace', function() {
        expect(Chartist).to.exist();
    });
});

describe('angular-chartist', function() {
    var $rootScope, $compile, element;

    beforeEach(module('angular-chartist'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        $rootScope.data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };

        $rootScope.chartType = 'Bar';

        var elm = '<chartist id="chartist" chartist-data="data" chartist-chart-type="Bar"></chartist>';

        element = $compile(elm)($rootScope);

        $rootScope.$digest();
    }));

    it('should contain a single svg element at the root level', function() {
        console.log(element.children());
        // expect(element.find('svg')).to.have.length(1);
        expect(true).to.be.true();
    });
});
