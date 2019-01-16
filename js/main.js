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




//Index_page_js_start
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
}
        
function checkLoginStatus(){
    getValue_loginpanel();
    firebase.auth().signInWithEmailAndPassword(email_logpanel, pass_logpanel)
    //.then(res=>{
    //    alert("Sucess");
   // })
    .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function registerUser(){
    getValue_regpanel();
    auth.createUserWithEmailAndPassword(email_regpanel, pass_regpanel)
    .catch(function(error) {
        // Handle Errors here
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
}
var user;
//Adding a authentication listener
auth.onAuthStateChanged(firebaseUser=>{
    if(firebaseUser){
        user=firebaseUser;
        console.log(firebaseUser.email);
        
    }
    else{
        console.log('not logged in');
        
    }

})
//Index_page_js_end

