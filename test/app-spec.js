describe('ngSharepoint Directive', function() {
    var $scope,
        service,
        url;
    
    beforeEach(function() {
        module('SPModule');
        inject(function($rootScope, $compile, $httpBackend) {
            $scope = $rootScope.$new();
        });
    });
    
    it('element in the DOM', function() {
        
    })
})