// This Service manages all SignalR Operations
var messageCounter = 0;
angular.module('chat') // the chat module
    .service('signalRService', ['$rootScope', function ($rootScope) {
        that = this;
        this.rootScope = $rootScope;
        this.rootScope.messageCounter = 0; // keep tracks of messages
        this.rootScope.online = []; // array of all Connected Users
        var connection = $.hubConnection(); // Create a SignalR Connection
        connection.logging = true;
        // Create  Hub Proxy that can communicate with Server Side Hub Class 
        var chatHubProxy = connection.createHubProxy('chatHub');

        // ~~~~~~~~~~~~~~~~ Register Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
        // This section contains Implementations of Client Side Methods //


        chatHubProxy.on('setOnline', function (name) {
            $('#user').append('<p class=text-center id=' + name + '>*' + name + '</p>');
            var p = document.getElementById(name);
            p.setAttribute('style', 'font-size: 30px;')
            //that.rootScope.online.push(name); 
        });
        chatHubProxy.on('setOffline', function (name) {
            //var index = $rootScope.online.indexOf(name);
            //that.rootScope.online.splice(index, 1);
            var person = document.getElementById(name);
            person.remove();
        });
        chatHubProxy.on('setColor', function (colorStr) {
            var p = document.getElementById($rootScope.id);
            p.setAttribute('style', 'font-size:30px ;color:'+ colorStr+ ';');  
        });
        chatHubProxy.on('enter', function (name, message) {
            console.log(name + ':' + message);
            var id = messageCounter;
            $('#discussion').append('<p id=' + id + '><strong>' + name + ':' + message + '</strong></p>');
            $rootScope.id = messageCounter;
            messageCounter++;
            var p = document.getElementById($rootScope.id);
            p.setAttribute('style', 'font-size: 30px;');
            window.setTimeout(function () {
                p.scrollIntoView();
            }, 100);
        });

        // ~~~~~~~~~~~~~~~~ Event Listeners END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

        // Start the SignalR Connection
        connection.start();

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signalr-service - Methods ~~~~~~~~~~~~~~~~~~~//
        this.broadcastMessage = function (name, message) {
            connection.start().done(function () {
                chatHubProxy.invoke('send', name, message); // invoke 'Send' Server Side Method defined in Hub Class
            }).fail(function () {
                console.log('connection failed');
            });
        };
        this.goOnline = function (name) {
            connection.start().done(function () {
                chatHubProxy.invoke('setOnline', name); // Invoke 'SetOnline'
            }).fail(function () {
                console.log('connection failed');
            });
        };
        this.goOffline = function (name) {
            connection.start().done(function () {
                chatHubProxy.invoke('setOffline', name); // Invoke 'SetOffline'
            }).fail(function () {
                console.log('connection failed');
            });
        };
    }]);
