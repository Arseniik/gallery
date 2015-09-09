'use strict';

(function() {
    angular
        .module('gallery')
        .factory('FilerFactory', FilerFactory);

    FilerFactory.$inject = ['$http', '$q'];

    function FilerFactory($http, $q) {
        return  {
            getFiles: getFiles
        }

        function getFiles() {
            return $http.get('http://localhost:8000/api/files');
        }
    }
})();
