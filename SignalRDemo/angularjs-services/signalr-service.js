// make this into a service instead
var messageCounter = 0;
angular.module('chat')
    .service('signalRService', ['$rootScope', function ($rootScope) {
        this.rootScope = $rootScope;
        this.rootScope = $rootScope;
        this.rootScope.messageCounter = 0;
        $rootScope.online = [];
        var connection = $.hubConnection();
        connection.logging = true;
        // Create  Hub Proxy that can communicate with Server Side Hub Class 
        var chatHubProxy = connection.createHubProxy('chatHub');

        chatHubProxy.on('setOnline', function (name) {
            $('#user').append('<p class=text-center id=' + name + '>*' + name + '</p>');
            var p = document.getElementById(name);
            p.setAttribute('style', 'font-size: 30px;')
            $rootScope.online.push(name);
           // var onlineUsers = JSON.parse(localStorage.getItem("onlineUsers"));
            //onlineUsers.push(name);
            //$rootScope.online = onlineUsers;
            //localStorage.setItem("onlineUsers", JSON.stringify(onlineUsers));

          
        });
        chatHubProxy.on('setOffline', function (name) {
            //$rootScope.online.pop();
            //var onlineUsers = JSON.parse(localStorage.getItem("onlineUsers"));
            var index = $rootScope.online.indexOf(name);
            $rootScope.online.splice(index, 1);
            //$rootScope.online = onlineUsers;
            //localStorage.setItem("onlineUsers", JSON.stringify(onlineUsers));
            var person = document.getElementById(name);
            person.remove();
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
        chatHubProxy.on('getOnlineUsers', function () {
            for (i = 0; i < $rootScope.online.length; i++) {
                $('#user').append('<p id=' + $rootScope.online[i] + '>' + $rootScope.online[i] + '</p>');
            }
        });
        connection.start();
        this.broadcastMessage = function (name, message) {
            connection.start().done(function () {
                //console.log("Connection Started");
                chatHubProxy.invoke('send', name, message); // invoke Server Side Method in Hub Class
            }).fail(function () {
                console.log('connection failed');
            });
        };
        this.goOnline = function (name) {
            connection.start().done(function () {
                chatHubProxy.invoke('setOnline', name);
            }).fail(function () {
                console.log('connection failed');
            });
        };
        this.goOffline = function (name) {
            connection.start().done(function () {
                chatHubProxy.invoke('setOffline', name);
            }).fail(function () {
                console.log('connection failed');
            });
        };
        this.getOnline = function () {
            connection.start().done(function () {
                chatHubProxy.invoke('getOnlineUsers');
            }).fail(function () {
                console.log('connection failed');
            });
        };
         
    }]);
