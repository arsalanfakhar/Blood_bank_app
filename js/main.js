// Initialize Firebase
var config = {
    apiKey: "AIzaSyB01U3GudvrOaiDl1HOOmyeyWh7XQnrDFY",
    authDomain: "blood-bank-app-716da.firebaseapp.com",
    databaseURL: "https://blood-bank-app-716da.firebaseio.com",
    projectId: "blood-bank-app-716da",
    storageBucket: "blood-bank-app-716da.appspot.com",
    messagingSenderId: "528218942271"
};
firebase.initializeApp(config);




//Login_page_js_start
function signup_btn_click(){
    var a=document.getElementById('navigation_tabs');
    var b=a.getElementsByTagName('li');
    //For first li
    b[0].className="";
    b[0].getElementsByTagName('a')[0].setAttribute("aria-expanded",false);
    document.getElementsByClassName('tab-pane')[0].className="tab-pane fade"
    //For second li
    b[1].className="active";
    b[1].getElementsByTagName('a')[0].setAttribute("aria-expanded",true);
    document.getElementsByClassName('tab-pane')[1].className="tab-pane fade in active";
}
function login_btn_click(){
    var a=document.getElementById('navigation_tabs');
    var b=a.getElementsByTagName('li');
    //For first li
    b[0].className="active";
    b[0].getElementsByTagName('a')[0].setAttribute("aria-expanded",true);
    document.getElementsByClassName('tab-pane')[0].className="tab-pane fade in active"
    //For second li
    b[1].className="";
    b[1].getElementsByTagName('a')[0].setAttribute("aria-expanded",false);
    document.getElementsByClassName('tab-pane')[1].className="tab-pane fade";
}

//Firebase authentications
const auth=firebase.auth();
var email_logpanel;var pass_logpanel;
var email_regpanel;var pass_regpanel;var reppass_regpanel;


function getValue_loginpanel(){
    email_logpanel=document.getElementById('email_logpanel').value;
    pass_logpanel=document.getElementById('pass_logpanel').value;
}

function getValue_regpanel(){
    email_regpanel=document.getElementById('email_regpanel').value;
    pass_regpanel=document.getElementById('pass_regpanel').value;
    reppass_regpanel=document.getElementById('reppass_regpanel').value;
    username_regpanel=document.getElementById('username').value;
}

function checkLoginStatus(){
    var status;
    var modal = document.getElementById("myModal");
    check=1;
    getValue_loginpanel();
  
    firebase.auth().signInWithEmailAndPassword(email_logpanel, pass_logpanel)

    .then(res=>{
       swal({
            title: "Congratulations",
            text: "You are Succefully logged in..!",
            icon: "success",
          })
          .then((data) => {
            if (data) {
            //replace location here
            location.replace("main_page.html");
          }
        }); 
      //  alert("Sucess");
    // modal.style.display="block";
    // status="now you are logged in";
    // document.getElementById("model-body").innerHTML='<h1>'+status+'</h1>'+'<br>'+ "<button class='btn btn-info btn-md glyphicon glyphicon-log-out' onclick='logout()'> "+" Logout "+'</button>';
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;

        swal({
            title: "Signed In Failed",
            text: error.message,
            icon: "error",
            
          }) 

      //  modal.style.display="block";
        
      //  document.getElementById("model-body").innerHTML='<h1>'+errorMessage+'</h1>'+'<br>'+ "<button class='btn btn-info btn-md glyphicon glyphicon-log-out' onclick='logout()'> "+" TryAgain! "+'</button>';

      //  alert(errorMessage);
    });
    
}
var check=0;
function registerUser(){
    check=2;
    var status;
    var modal = document.getElementById("myModal");
    getValue_regpanel();
    if(pass_regpanel!=reppass_regpanel){       
        swal({
            title: "Password Mismatch",
            text: "Your Passwords did not match!",
            type: "error",
            icon: "error",
          })
    }
   else {
    auth.createUserWithEmailAndPassword(email_regpanel, pass_regpanel)
    .then(res=>{
        auth.currentUser.updateProfile({
            displayName: username_regpanel
        })
        swal({
            title: "Congratulations",
            text: "You are Automatically logged in..!",
            icon: "success",
        
       
          })
          .then((data) => {
            if (data) {
            //replace location here
              location.replace("main_page.html");
          }
        }); 
    //   modal.style.display="block";
    //   status="Registered Succefully and Logged in..";
    //   document.getElementById("model-body").innerHTML='<h1>'+status+'</h1>'+'<br>'+ "<button class='btn btn-info btn-md glyphicon glyphicon-log-out' onclick='logout()'> "+" Logout "+'</button>';
      
      })
    .catch(function(error) {

        swal({
            title: "Registeration Failed",
            text: error.message,
            type: "error",
            icon: "error",
          }) 
        // Handle Errors here
      //  var errorMessage = error.message;
      //  modal.style.display="block";
        
     //   document.getElementById("model-body").innerHTML='<h1>'+errorMessage+'</h1>'+'<br>'+ "<button class='btn btn-info btn-md glyphicon glyphicon-log-out' onclick='logout()'> "+" TryAgain! "+'</button>';
        // ...
    });}
}
var user;

//Adding a authentication listener
auth.onAuthStateChanged(firebaseUser=>{
    if(firebaseUser){
        user=firebaseUser;
        console.log(firebaseUser.email);
        //Check for main_page
        //when hosting set it to location.pathname
        if(location.href=="file:///F:/Blood%20bank%20site/main_page.html")
        {
            setDisplayName();
        }


    }
    else{
        console.log('not logged in');
        
    }

})
/* function logout(){

    auth.signOut();
    document.getElementById("myModal").style.display="none";
    if(check==1){
  document.getElementById('email_logpanel').value="";
    document.getElementById('pass_logpanel').value="";
    
  var a=document.getElementById('navigation_tabs');
  var b=a.getElementsByTagName('li');
  //For first li
  b[0].className="active";
  b[0].getElementsByTagName('a')[0].setAttribute("aria-expanded",true);
  document.getElementsByClassName('tab-pane')[0].className="tab-pane fade in active"
  //For second li
  b[1].className="";
  b[1].getElementsByTagName('a')[0].setAttribute("aria-expanded",false);
  document.getElementsByClassName('tab-pane')[1].className="tab-pane fade";
    }
    else if(check==2){
        document.getElementById('email_regpanel').value="";
        document.getElementById('pass_regpanel').value="";
        document.getElementById('reppass_regpanel').value="";
        var a=document.getElementById('navigation_tabs');
        var b=a.getElementsByTagName('li');
        //For first li
        b[0].className="";
        b[0].getElementsByTagName('a')[0].setAttribute("aria-expanded",false);
        document.getElementsByClassName('tab-pane')[0].className="tab-pane fade"
        //For second li
        b[1].className="active";
        b[1].getElementsByTagName('a')[0].setAttribute("aria-expanded",true);
        document.getElementsByClassName('tab-pane')[1].className="tab-pane fade in active";


    }

} */

//Login_page_js_end

//Main_page_js_start

function logout_user(){
    auth.signOut();
    location.replace("./index.html")
}



function setDisplayName(){
    if(user==null){
        setInterval(setDisplayName(),1000);
    }
    else{
        if(user.displayName=="" ||user.displayName==null ){
            document.getElementById('display_username').innerHTML="Username";
            }
            else{
            document.getElementById('display_username').innerHTML=user.displayName;
            }
    }
    
} 

//Main_page_js_end

//Donor_page_js_start
function regDonor(){
    location.assign("donor_reg_form.html")
}


//Donor_page_js_end