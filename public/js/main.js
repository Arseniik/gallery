'use strict';

(function() {
    angular
        .module('gallery', [
            'ngRoute',
            'ui.bootstrap',
            'galleryFilters'
        ])
        .config(['$routeProvider', '$interpolateProvider', function($routeProvider, $interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
            $routeProvider.otherwise({redirectTo: '/'});

        /*
            $routeProvider.when('/', {
                templateUrl: '../../views/index.html',
                controller: 'FilerController',
                controllerAs: 'vm'
            });
            */
        }]);
})();
