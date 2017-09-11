(function () {

    "use strict";

    angular.module('SmsSimulatorLandingApp')
        .controller('HomeController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'toaster',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, toaster) {
                $timeout(function(){
                    if($scope.flash.error.length > 0){
                        toaster.pop('error', "", $scope.flash.error);
                    }
                    if($scope.flash.message.length > 0){
                        toaster.pop('success', "", $scope.flash.message);
                    }
                }, 1000)
            }])
}());