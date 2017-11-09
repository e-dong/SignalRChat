using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRDemo
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.enter(name, message);
        }
        public void SetOnline(string name)
        {
            Clients.All.setOnline(name);
        }
        public void SetOffline(string name)
        {
            Clients.All.setOffline(name);
        }
        public void GetOnlineUsers()
        {
            Clients.All.getOnlineUsers();
        }
    }
}