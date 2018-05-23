

const WRONG_ERROR = "Incorrect username or password.";
const LOGGED_ERROR = "This user is already logged in";
var createacc = false;

/* var socket;

function submitHobo()
{
    var user = document.getElementById("user2").value;
    joinattempt(user,"wawawwawwaw23");
   // window.location.href = "chat.html?user="+user;
}



function joinattempt(user,pass)
{
    socket = io({query: "user="+user+"&pass="+pass });

    socket.on('allow', function(user,type)
    {
        window.location.href = "chat.html?user="+user+"&type="+type;
        socket.disconnect();
    });
}
 */

//DOMContentLoaded
/* window.addEventListener('load', function()
{
    document.getElementById("login-page").opacity = 1;
});
 */
xhr = new XMLHttpRequest();

function submitLogin()
{
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    xhr.open('POST', 'loginsubmit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    //x-www-form-urlencoded
    xhr.onload = function() {
        if(xhr.status === 200)
        {
            if(JSON.parse(xhr.responseText).user)
            {
                window.location.reload();
            }
            else if(JSON.parse(xhr.responseText).wrong)
            {
                console.log("wrong password/acc");
                document.getElementById('err').style.visibility = 'visible';
                document.getElementById('err').innerHTML = WRONG_ERROR;
            }
            else if(JSON.parse(xhr.responseText).logged)
            {
                console.log("this user logged in");
                document.getElementById('err').style.visibility = 'visible';
                document.getElementById('err').innerHTML = LOGGED_ERROR;
            }  
        }
        else if (xhr.status === 204 && xhr.responseText !== user) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    var jsn = {"user":user,"pass":pass};
    
    xhr.send(JSON.stringify(jsn));

    //encodeURI
    //joinattempt(user,pass);
   // window.location.href = "chat.html?user="+user;
}

function submitHobo()
{
    var user = document.getElementById("user2").value;
    var pass = "magicalnothingwaw23awaw"

    xhr.open('POST', 'loginsubmit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    //x-www-form-urlencoded
    xhr.onload = function() 
    {
        if(xhr.status === 200)
        {
            if(JSON.parse(xhr.responseText).user)
            {
                window.location.reload();
            }
            else if(JSON.parse(xhr.responseText).logged)
            {
                console.log("this user logged in");
                document.getElementById('err').style.visibility = 'visible';
                document.getElementById('err').innerHTML = LOGGED_ERROR;
            }  
        }
        else if (xhr.status === 204 && xhr.responseText !== user) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    var jsn = {"user":user,"pass":pass};
    
    xhr.send(JSON.stringify(jsn));
}

function submitReg()
{
    var user = document.getElementById("userreg").value;
    var pass = document.getElementById("passreg").value;

    xhr.open('POST', 'accsubmit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    //x-www-form-urlencoded
    xhr.onload = function() 
    {
        if(xhr.status === 200)
        {
            console.log(JSON.parse(xhr.responseText));
            console.log(JSON.parse(xhr.responseText).status);
            if(JSON.parse(xhr.responseText).status==true)
            {
                document.getElementById('accmsg').innerHTML="Account created!";
            }
            else if(JSON.parse(xhr.responseText).status==false)
            {
                document.getElementById('accmsg').innerHTML="Name already taken.";
            }  
        }
        else if (xhr.status === 204 && xhr.responseText !== user) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    var jsn = {"user":user,"pass":pass};
    
    xhr.send(JSON.stringify(jsn));

}
function showacc()
{
    createacc = !createacc;

    if(createacc)
    {
        document.getElementById('form').style.minHeight='0px';
        document.getElementById('form').style.height = '20px';

        document.getElementById('user').style.visibility='hidden';
        document.getElementById('pass').style.visibility='hidden';
        document.getElementById('user2').style.visibility='hidden';
        document.getElementById('send2').style.visibility='hidden';
        document.getElementById('send').style.visibility='hidden';
        document.getElementById('send2').style.visibility='hidden';
        document.getElementById('message').style.visibility='hidden';
        document.getElementById('err').style.visibility='hidden';
        document.getElementById('userreg').style.visibility='visible';
        document.getElementById('passreg').style.visibility='visible';
        document.getElementById('sendreg').style.visibility='visible';
        document.getElementById('accmsg').style.visibility='visible';
        //document.getElementById("register-form").style.visibility="visible";
        setTimeout(function() 
        {
            document.getElementById("form").style.zIndex = "5";
            document.getElementById("register-form").style.zIndex = "10";
        }, 1250);
        document.getElementById('reg').value="Return to Login";
    }
    else
    {
        document.getElementById('form').style.minHeight='480px';
        document.getElementById('form').style.height = '50%';

        document.getElementById('user').style.visibility='visible';
        document.getElementById('pass').style.visibility='visible';
        document.getElementById('user2').style.visibility='visible';
        document.getElementById('send2').style.visibility='visible';
        document.getElementById('send').style.visibility='visible';
        document.getElementById('send2').style.visibility='visible';
        document.getElementById('message').style.visibility='visible';
        document.getElementById('userreg').style.visibility='hidden';
        document.getElementById('passreg').style.visibility='hidden';
        document.getElementById('sendreg').style.visibility='hidden';
        document.getElementById('accmsg').style.visibility='hidden';
       // document.getElementById("register-form").style.visibility="hidden";
        document.getElementById("form").style.zIndex = "10";
        document.getElementById("register-form").style.zIndex = "5";
        document.getElementById('reg').value="Create account";
    }
}