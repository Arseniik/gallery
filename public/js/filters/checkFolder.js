'use strict';

/* Filters */

angular.module('galleryFilters', [])
    .filter('checkFolder', function() {
        return function(input) {
            return (input.indexOf(".") < 0) ? 'folder' : 'picture';
        };
})
    .filter('debug', function() {
        return function(input) {
            if (input === '') return 'empty string';
                return input ? input : ('' + input);
            };
});
