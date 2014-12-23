'use strict';

describe('angular-chartist', function() {
    var $compile, $rootScope;

    beforeEach(module('angular-chartist'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should work', function() {
        expect(true).to.be.true();
    });
});
