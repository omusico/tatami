angular.module('tatami', ['ionic', 'tatami.services', 'tatami.providers', 'ngResource', 'ngCordova'])

    .run(['$ionicPlatform', '$state', '$localStorage', '$ionicHistory', 'ProfileService', '$rootScope', function ($ionicPlatform, $state, $localStorage, $ionicHistory, ProfileService, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.backgroundColorByName('white');
            }
        });

        $ionicPlatform.on('resume', resume);

        function resume() {

            if(isValidToken()) {
                $state.go('timeline');
            } else {
                $localStorage.clear();
                $ionicHistory.clearCache();
                $state.go('login');
            }
        }

        resume();

        function isValidToken() {
            var token = $localStorage.get('token');
            console.log(token);
            return token && token.expires && token.expires > new Date().getTime()
        }
    }])

    .config(function ($resourceProvider, $stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        $resourceProvider.defaults.stripTrailingSlashes = false;

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tatami', {
                url: '',
                abstract: true,
                templateUrl: 'app/tatami.html',
                controller: 'TatamiCtrl',
                controllerAs: 'vm'
            });

        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('authExpiredInterceptor');

    });
