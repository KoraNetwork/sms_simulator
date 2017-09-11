(function () {
    "use strict";
    var SmsSimulatorLandingApp = angular.module('SmsSimulatorLandingApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'fileread',
        'ui.bootstrap',
        'bootstrapLightbox',
        'formInput.images',
        'formInput.image',
        'toaster',
        'AuthHttp',
        'angular-ladda'
    ]);

    SmsSimulatorLandingApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                  url: '/',
                  templateUrl: 'landing/templates/home/index.html',
                  controller: 'HomeController'
                });
    }]);

    SmsSimulatorLandingApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());