
// get: var storedNames = JSON.parse(localStorage.getItem("onlineUsers"));

var name = "";
angular.module('chat', ['SignalR', 'ngRoute'])
    .controller('Login', ['signalRService', '$rootScope', function (signalRService, $rootScope) {
        that = this;
        this.loggedIn = false;
        this.rootScope = $rootScope;
        this.name;

        this.logIn = function () {
            var element = document.getElementById('name');
            name = element.value;
            that.name = name;
            signalRService.goOnline(name);
            this.loggedIn = true;
            element.value = "";
        };
        this.logOut = function () {
            that.loggedIn = false;
            signalRService.goOffline(name);
        }
    }])
    .controller('EnterMessage', ['signalRService', '$rootScope', function (signalRService, $rootScope) { // need to inject chatService here
        this.message = "";
        this.rootScope = $rootScope;

        this.enterText = function () {
            var text = document.getElementById('text');            
            signalRService.broadcastMessage(that.name, text.value);
            text.value = ""; 
        };
    }]);
