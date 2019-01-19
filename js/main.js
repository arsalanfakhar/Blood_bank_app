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
            retrieve();
          
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
              retrieve();
            
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
    
    
    
    
        if(user.displayName=="" ||user.displayName==null ){
            
            document.getElementById('display_username').innerHTML="Username";
            }
            else{
            document.getElementById('display_username').innerHTML=user.displayName;
            }
    
    
        
    
    
} 

/*Changes start */
const  database = firebase.database();

var data;
database.ref().on('value',function(snapshot){
    data=snapshot.val();
    

})

function regDonor(){

    database.ref('Records/'+user.uid).once('value',function(snapshot){
        
        if(snapshot.exists()){
            var mydata=snapshot.val();
            //Precaution but not necessary
            if(mydata.email==user.email){
                swal({
                    title: "Already Registered",
                    text: "Kitni bar khun dega mar jaye ga",
                    icon: "error"
                  })
            }
            
            //console.log('Mera');
            //console.log(snapshot.val());   
        }
        else{
            location.assign("donor_reg_form.html");
        }

    })
   // location.assign("trial_donor.html");
}
/*Changes end */



//Main_page_js_end

//Donor_page_js_start

var firstName;var lastName;var dateob;var email_donors;var address_donor;
var address_donor;var age_donor;var phone_donor;var blood_grp;

function getValues(){
    
    firstName=document.getElementById("firstname").value;
     lastName=document.getElementById("lastname").value;
     dateob=document.getElementById("dateofb").value;
     email_donors=document.getElementById('email_donor').value;

     address_donor=document.getElementById("address").value;
     age_donor=document.getElementById("age").value;
     phone_donor=document.getElementById("phone_number").value;
     blood_grp=document.getElementById("selectpicker").value;
}

function submitData(){
    getValues();
    database.ref('Records/'+user.uid).set({
        name:firstName+" "+lastName,
        DateOfbirth:dateob,
        email:email_donors,
        Address:address_donor,
        Age:age_donor,
        Phone_Number:phone_donor,
        Blood_Group:blood_grp

    })
    .then(()=>{
        swal({
            title: "Congratulations",
            text: "You Saved a life!",
            icon: "success",
          })
          .then(res=>{
            location.replace("main_page.html");
          })
    })
}









/* function showage(){ 
  
 
var today=new Date();

var c_year=today.getFullYear();

var str=document.getElementById("dateofb").value;
var arr=str.split("-");



var Age=c_year-arr[0];

document.getElementById("age").value=Age;


} */
// function regDonor(){
//     location.assign("donor_reg_form.html");
// }
var firebaseRef=firebase.database().ref();
//retrieve();
// var counts;
// firebaseRef.child("Records").on('value', function(snapshot) { counts= snapshot.numChildren(); });
// //var num=firebaseRef.child("Records").datasnapshot.getChildrenCount();
// var checking=0;

// function submit (){

// var  email=document.getElementById("email_donor").value;





// var isregistered=()=>
// {
//     this.checking=0;
//     //var t=1;
    
//     firebaseRef.child("Records").once('value', function(snapshot){
// if(snapshot.exists()){
//     var content = '';

//     snapshot.forEach(function(data){
//         var val = data.val();
//        // alert(email);
//        // alert(val.Email);
//      if(val.Email===email){
//        //  alert("in email matching if");
       
//     this.checking=1;
//     }
//     });
   

// }

// });




// }

// isregistered();




// if(checking){
// alert("Already Registered");
// }
// else{
// var firstName=document.getElementById("firstname").value;
// var lastName=document.getElementById("lastname").value;
// var dateOfBirth=document.getElementById("dateofb").value;

// var address=document.getElementById("address").value;
// var age=document.getElementById("age").value;
// var phone_number=document.getElementById("phone_number").value;
// var bloodGroup=document.getElementById("selectpicker").value;
// if(firstName==""||lastName==""||dateOfBirth==""||address==""||age==""||phone_number==""||bloodGroup=="")
// {
// alert("some fields are empty!");
// }
// else{
// firebaseRef.child("Records//"+(++counts)).set({name:firstName+lastName,DateOfbirth:dateOfBirth,Email:email,Address:address,Age:age,Phone_Number:phone_number,Blood_Group:bloodGroup});
// //firebaseRef.child("Records").set({name:firstName+lastName,DateOfbirth:"dateOfBirth",Email:"email"});
// alert("Registered");
// location.replace("main_page.html");

// /*swal({
//     title: "Congratulations",
//     text: "You are Registered.!",
//     icon: "success",


//   })
//   .then((data) => {
//     if (data) {
    
//       location.replace("main_page.html");
//   }
// }); */


// }
// }
// }//submit end

/*
()=>{
    if(document.getElementById("blood_grp").value=="Default"){var n="default";retrieve("Default");}
}
function whenchanging(){
alert("i m here");
    var a=document.getElementById("blood_grp").value;
   retrieve(a);
}
*/

function retrieve()
{ 
    var a=document.getElementById("blood_grp").value;//a  is taking for searching a/c to blood group
    var t=1;
  
    firebaseRef.child("Records").once('value', function(snapshot){
        var s='<tr style="border:1px solid black" id="tr" >'+
        '<th style="border:1px solid black ">#</th>'+
        '<th style="border:1px solid black ">Names</th>'+
        '<th style="border:1px solid black">Blood Group</th>' +
        '<th style="border:1px solid black">Age</th>' +
        '<th style="border:1px solid black">Phone Number</th>'+
        '<th style="border:1px solid black">Address</th>' +
        '<th style="border:1px solid black">Email</th>'
         var content = '';

    if(snapshot.exists()){
   
    

    snapshot.forEach(function(data){
        
        var val = data.val();
      if(a=="Default"){
        
        
        content +='<tr style="border:1px solid black">';
        content+='<td style="border:1px solid black">'+t+'</td>';
        content += '<td style="border:1px solid black">' + val.name + '</td>';
        
        content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
        content += '<td style="border:1px solid black">' + val.Age+ '</td>';
        content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
        content += '<td style="border:1px solid black">' + val.Address+ '</td>';
        content += '<td style="border:1px solid black">' + val.email+ '</td>';

     
        
        content += '</tr>';
        t++;}
     else if(a==val.Blood_Group){
         
              
                
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.Email+ '</td>';

                content += '</tr>';
                t++;

      }
     
    });
    //$('#ex-table').append(content);
  
   
   if(content!="")
    document.getElementById("ex-table").innerHTML=s+content;
 else{
    //document.getElementById("ex-table").innerHTML=s+"<h1>No Record<h1>";
    document.getElementById("ex-table").innerHTML=s+'<tr>'+'<td colspan="7">'+'<h1 class="text-center">No Record<h1>'+ '</td>'+ '</tr>';
 }
    
     

}
else{
    s+='</tr>';
    document.getElementById("ex-table").innerHTML=s+'<tr>'+'<td colspan="7">'+'<h1 class="text-center">No Record<h1>'+ '</td>'+ '</tr>';
}


});




}

//Donor_page_js_end