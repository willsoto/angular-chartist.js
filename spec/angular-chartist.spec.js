/* global $, angular, Chartist */
'use strict';

describe('libraries', function() {
    it('should load Chartist into the global namespace', function() {
        expect(Chartist).to.exist;
    });
});

describe('angular-chartist', function() {
    var scope, $sandbox, $compile;

    beforeEach(module('angular-chartist'));

    beforeEach(inject(function($injector) {
        scope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        // scope = $rootScope.$new();

        $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
    }));

    afterEach(function() {
        $sandbox.remove();
        scope.$destroy();
    });

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
        template = template ? templates[template] : templates['default'];
        angular.extend(scope, template.scope || templates['default'].scope);

        var $element = $(template.element).appendTo($sandbox);

        $element = $compile($element)(scope);

        scope.$digest();

        return $element;
    }

    // it('should contain a single svg element at the root level', function() {
    //     var elm = compileDirective();
    //     console.log(elm);
    //     // expect(elm.children()).to.have.length(1);
    // });
});
