(function() {
    'use strict';

    angular.module('tatami.services')
        .factory('$localStorage', localStorage);

    localStorage.$inject = ['$window'];
    function localStorage($window) {
        var service = {
            get: getFromLocalStorage,
            set: setFromLocalStorage,
            clear: clearLocalStorage
        };

        return service;

        getFromLocalStorage.$inject = ['key'];
        function getFromLocalStorage(key) {
            if(isLocalStorageUndefined(key)) {
                return undefined;
            }
            if($window.localStorage[key] === 'undefined') {
                alert('it is undefined');
            }
            return JSON.parse($window.localStorage[key] || '{}');
        }

        setFromLocalStorage.$inject = ['key', 'value'];
        function setFromLocalStorage(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function clearLocalStorage() {
            $window.localStorage.clear();
        }

        isLocalStorageUndefined.$inject = ['key'];
        function isLocalStorageUndefined(key) {
            return $window.localStorage.length === 0 || $window.localStorage[key] === 'undefined';
        }
    }
})();
