using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

/*
 *  This Class list all Server Side Methods that the hub proxy can be invoked with 
 *  
 */
namespace SignalRDemo
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            if (name == "server")
            {
                Clients.All.enter(name, message);
                Clients.All.setColor("black");
            }
            else
            {
                Clients.Caller.enter("you", message);
                Clients.Others.enter(name, message);
                Clients.Caller.setColor("blue");
                Clients.Others.setColor("red");

            }
        }
        public void SetOnline(string name)
        {
            // appear online to all connected clients
            Clients.All.setOnline(name);
        }
        public void SetOffline(string name)
        {
            // appear offline to all connected clients
            Clients.All.setOffline(name);
        }
    }
}