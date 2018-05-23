/* 
var user = prompt("Enter your name : ", "type name..");
var pass = prompt("Enter your password : ", "type pass.."); */

/* xhr = new XMLHttpRequest();
xhr.onload = function() {
    if (xhr.status === 200) 
    {
        alert(xhr.responseText);
    }
};
 */
//var human = this.getResponseHeader('xxx-user');
//console.log(human);

var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getResponseHeader('xxx-user').toLowerCase();
var chatmsgs = req.getResponseHeader('xxx-chatmsgs').toLowerCase();

/* var urls = window.location.href;
var url = new URL(urls); */
var user=JSON.parse(headers).user;
var type=JSON.parse(headers).type;
var room=JSON.parse(headers).room;

//console.log(chatmsgs);
console.log("====");
console.log(chatmsgs);


//console.log(chatmsgs);

//var pass=JSON.parse(headers).pass;

var allmessages = [];
var color = "black";
var first = true;
var yourcolor = "black";
//var typo = "hobo";

/* if(user == null || user == '' || user == "type name..")
{
    user = "user"+(Math.floor(Math.random() * 400) + 1).toString();
 
} */



var socket = io({query: "user="+user+"&type="+type+"&room="+room});
//var socket = io({query: "connected="+true});

function enterpress(e)
{
    e=e||window.event;
    var key = e.keyCode;
    console.log(key);
    if(key==13) //Enter
    {
       submitMessage();
       return true; //return true to submit, false to do nothing
    }
    if(key==76) //L
    {
       submitLog();
    }
}

function submitMessage()
{
    var text = document.getElementById("field").value;
    document.getElementById("field").value = '';
    if(text.length)
    socket.emit('chat message', user,': '+text,type);

    return false;
}

function submitLog()
{
   var pass = prompt("Password: ", "");
   socket.emit('sendlogs',pass,allmessages);
}

function logout()
{
    window.location.href = '/logout';
}

socket.on('chat message', function(user,msg,type)
{
    allmessages.push(user+msg);
    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    var b = document.createElement("b");
    usertype(type);
    b.style.color = color;
    b.appendChild(document.createTextNode(user));
    li.appendChild(b);
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);

    setTimeout(function() {
        li.className = li.className + " show";
        window.scrollTo(0, ul.scrollHeight);
      }, 10);
});

socket.on('newuser', function(msg,type,bgclr)
{
    document.getElementById("field").focus(); 
    var newuser = msg[msg.length-1];

    console.log(type.length-1);

   // usertype(type[types.length-1]);
     usertype(type[type.length-1]);

    if(first)
    {
        updatechat();
        yourcolor = color;
        user = newuser;
    }
    document.getElementById("who").innerHTML="hello ";
    var b = document.createElement("b");
    b.style.color = yourcolor;
    b.appendChild(document.createTextNode(user));
    document.getElementById("who").appendChild(b);

    document.getElementById("online").innerHTML="online: "+msg.length;
    document.getElementById("users").innerHTML=msg.toString();

    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    li.style.color = color;
    var b = document.createElement("b");
    b.appendChild(document.createTextNode(newuser+" connected to the chat."));
    li.appendChild(b);
    ul.appendChild(li);

    document.body.style.backgroundColor = bgclr;

    setTimeout(function() {
        li.className = li.className + " show";
      }, 10);

    window.scrollTo(0, ul.scrollHeight); 
    first = false;
});

socket.on('removeuser', function(users,human)
{
     document.getElementById("online").innerHTML="online: "+users.length;
     document.getElementById("users").innerHTML=users.toString();

     var ul = document.getElementById("messages");
     var li = document.createElement("li");
     var txt = human+ " left the chat.";
     li.style.color = "Gray";
     var b = document.createElement("b");
     b.appendChild(document.createTextNode(txt));
     li.appendChild(b);
     ul.appendChild(li);

     setTimeout(function() {
        li.className = li.className + " show";
      }, 10);

     window.scrollTo(0, ul.scrollHeight);
});

socket.on('kick', function(users,human)
{
     document.getElementById("online").innerHTML="online: "+users.length;
     document.getElementById("users").innerHTML=users.toString();

     var ul = document.getElementById("messages");
     var li = document.createElement("li");
     var txt = human+ " was auto kicked by halvajs system";
     li.style.color = "Gray";
     var b = document.createElement("b");
     b.appendChild(document.createTextNode(txt));
     li.appendChild(b);
     ul.appendChild(li);

     setTimeout(function() {
        li.className = li.className + " show";
      }, 10);

     window.scrollTo(0, ul.scrollHeight);
});

socket.on('reload', function()
{
    window.location.href = '/logout';
});

socket.on('changebg',function(user,type,bg)
{
    allmessages.push(user+" has changed background color to "+bg);
    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    var b = document.createElement("b");
    usertype(type);
    b.style.color = color;
    b.appendChild(document.createTextNode(user));
    li.appendChild(b);
    li.appendChild(document.createTextNode(" has changed background color to "+bg));
    ul.appendChild(li);

    document.body.style.backgroundColor = bg;

    setTimeout(function() {
        li.className = li.className + " show";
        window.scrollTo(0, ul.scrollHeight);
      }, 10);
});


function usertype(type)
{
    if(type == "dev")
    {
        console.log("what???????? "+type);
        color = "red";
       // user = '[halva]'+user;
    }
    else if(type == "admin")
    {
        color = "orange";
       // user = '[halva]'+user;
    }
    else if(type == "hobo")
    {
        color = "black";
    }
    else
    {
        color = "green";
       // user = '[halva]'+user;
    }
}

function showbutton(a)
{
    if(a)
    document.getElementById('send').style.visibility = 'visible';
    else
    document.getElementById('send').style.visibility = 'hidden';
}

function showv(a)
{
    if(a)
    {
        document.getElementById('v').style.visibility = 'visible';
        document.getElementById('v').style.opacity = 1;
    }
    else
    {
        document.getElementById('v').style.visibility = 'hidden';
        document.getElementById('v').style.opacity = 0;
    }
}

function updatechat()
{
    chatmsgs = JSON.parse(chatmsgs);

    for(i=0; i<chatmsgs.chatmsgs.length; i++)
    {
        var msg = chatmsgs.chatmsgs[i].msg;
        var type = chatmsgs.chatmsgs[i].type;

        console.log(msg + " type of "+
        type);

       // allmessages.push(msg);
        var ul = document.getElementById("messages");
        var li = document.createElement("li");
        var b = document.createElement("b");
        //usertype(type);
        // b.style.color = color;
        // b.appendChild(document.createTextNode(user));
        // li.appendChild(b);
        li.appendChild(document.createTextNode(msg));
        ul.appendChild(li);

        li.className = li.className + " show";
        window.scrollTo(0, ul.scrollHeight);
    } 
}