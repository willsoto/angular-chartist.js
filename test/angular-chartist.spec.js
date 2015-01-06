'use strict';

describe('angular-chartist', function() {
    var $rootScope, $compile;

    beforeEach(module('angular-chartist'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
    }));

    it('should work as an element', function() {
        var elm = angular.element('<chartist chartist-data="{labels: [\'Jan\', \'Feb\', \'Mar\', \'Apr\', \'May\', \'Jun\', \'Jul\', \'Aug\', \'Sep\', \'Oct\', \'Nov\', \'Dec\'],series: [[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],[3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]]}" chartist-chart-type="Bar"></chartist>');
        $compile(elm)($rootScope);
        expect(true).to.be.true();
    });
});
