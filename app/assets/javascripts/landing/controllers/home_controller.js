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
                }, 1000);

                $scope.messages = [];
                $scope.phone_number = '+15623625612';

                $scope.SmsSocketApp || ($scope.SmsSocketApp = {});
                $scope.SmsSocketApp.cable = ActionCable.createConsumer();

                $scope.SmsSocketApp.watcher = $scope.SmsSocketApp.cable.subscriptions.create({
                    channel: "TwilioChannel",
                    phone_number: $scope.phone_number
                },{
                    received: function(data){
                        $scope.$apply(function(){
                            $scope.messages.push({
                                body: trialString(data.body),
                                incoming: data.incoming
                            });
                            if($scope.messages.length > 50){
                                $scope.messages = $scope.messages.slice($scope.messages.length - 50);
                            }
                            $scope.scroll();
                        });
                    },
                    connected: function(){
                        console.log('Connected to TwilioChannel');
                    },
                    disconnected: function(){
                        console.log('Disconnected TwilioChannel');
                    },
                    send_message: function(message){
                        this.perform('speak', {
                            body: message,
                            phone_number: $scope.phone_number
                        })
                    }
                });

                $scope.$on("$destroy", function(){
                    if($scope.SmsSocketApp && $scope.SmsSocketApp.watcher){
                        $scope.SmsSocketApp.watcher.unsubscribe();
                    }
                });

                $scope.send = function() {
                    $scope.formPending = true;
                    $scope.SmsSocketApp.watcher.send_message($scope.message);
                    $scope.message = '';
                    $scope.formPending = false;
                };

                $scope.scroll = function(){
                    $(".screen").animate({ scrollTop: 7777 }, '500', 'swing');
                };

                var trial_string = "Sent from your Twilio trial account";
                var trialString = function(message){
                    if(message.indexOf(trial_string) > -1) return message.substr(trial_string.length + 3);
                    else return message;
                };
            }])
}());