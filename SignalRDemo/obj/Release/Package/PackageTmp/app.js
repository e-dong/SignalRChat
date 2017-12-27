//var name = "";
angular.module('chat', ['SignalR', 'ngRoute'])
    // Handles the events where users log in and log out
    .controller('Login', ['signalRService', '$rootScope', function (signalRService, $rootScope) { 
        this.loggedIn = false;
        this.rootScope = $rootScope;
        this.rootScope.name = "";
        this.signalRService = signalRService;
        var that = this;
        this.logIn = function () {
            var element = document.getElementById('name');
            var name = element.value; 
            signalRService.goOnline(name); // allows all clients to see you went online
            signalRService.broadcastMessage("server", "*" + name + " has entered the room*")
            that.rootScope.name = name;
            that.loggedIn = true;
            element.value = "";
        };
        this.logOut = function () {
            that.loggedIn = false;
            signalRService.goOffline(that.rootScope.name); // allows all clients to see you went offline
            signalRService.broadcastMessage("server", "*" + that.rootScope.name + " has left the room*");
        }
    }])
    // Handles the event where user enter a message in the chat room
    .controller('EnterMessage', ['signalRService', '$rootScope', function (signalRService, $rootScope) { 
        this.message = "";
        
        this.enterText = function () {
            var text = document.getElementById('text');            
            signalRService.broadcastMessage($rootScope.name, text.value); // broadcast that message to all other Clients
            text.value = ""; 
        };
    }]);
