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

//Variable tell status of re-direction
var tellstatus=false;
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
    tellstatus=true;
    var status;
    check=1;
    document.getElementsByClassName('overlay')[0].style.display="block";
    getValue_loginpanel();
  
    firebase.auth().signInWithEmailAndPassword(email_logpanel, pass_logpanel)

    .then(res=>{
        document.getElementsByClassName('overlay')[0].style.display="none";
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
    })
    .catch(function(error) {
        document.getElementsByClassName('overlay')[0].style.display="none";
        // Handle Errors here.
        var errorMessage = error.message;

        swal({
            title: "Signed In Failed",
            text: error.message,
            icon: "error",
            
          }) 
    });
    
}
var check=0;
function registerUser(){
    tellstatus=true;
    check=2;
    var status;
    
    getValue_regpanel();
    if(pass_regpanel!=reppass_regpanel){       
        swal({
            title: "Password Mismatch",
            text: "Your Passwords did not match!",
            icon: "error",
          })
    }
   else {
    document.getElementsByClassName('overlay')[0].style.display="block";
    auth.createUserWithEmailAndPassword(email_regpanel, pass_regpanel)
    .then(res=>{
        auth.currentUser.updateProfile({
            displayName: username_regpanel
        })
        document.getElementsByClassName('overlay')[0].style.display="none";
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
      })
    .catch(function(error) {
        document.getElementsByClassName('overlay')[0].style.display="none";
        swal({
            title: "Registeration Failed",
            text: error.message,
            icon: "error",
          }) 
    });}
}

var user;
//Adding a authentication listener
auth.onAuthStateChanged(firebaseUser=>{
    
    if(firebaseUser){

        if((location.pathname=="/" || location.pathname=="/index.html") && tellstatus==false){
            swal({
                title: "Redirecting",
                text: "Taking to new page",
                icon: "success",
            })
            .then((value)=>{
                location.replace("main_page.html");
            })
            
        }
        //check it
        
      this.user=firebaseUser;
     
        console.log(firebaseUser.email);
        //Check for main_page
        //when hosting set it to location.pathname
         if(location.pathname=="/main_page.html")
         {
            
             setDisplayName();
             
         }
         if(location.pathname=="/donor_reg_form.html"){

            setEmail();
            document.getElementsByClassName('overlay')[0].style.display="none";

         }
    }
    else{
        console.log('not logged in');
        if(location.pathname=="/" || location.pathname=="/index.html"){
            //if response is earlier then also stop user
            setTimeout(function(){
                document.getElementsByClassName('overlay')[0].style.display="none";
            },1000)
            
        }
        if(location.pathname=="/main_page.html"){
            document.getElementsByClassName('overlay')[0].style.display="none";
            swal({
                title: "Redirecting",
                text: "You must be logged in to continue",
                icon: "error",
            })
            .then((value)=>{
                location.replace("index.html");
            })
        }
        if(location.pathname=="/donor_reg_form.html"){
            document.getElementsByClassName('overlay')[0].style.display="none";
            swal({
                title: "Redirecting",
                text: "You must be logged in to continue",
                icon: "error",
            })
            .then((value)=>{
                location.replace("index.html");
            })
        }
    }

})

function resetpasslink() {
    var email= document.getElementById('email_logpanel').value;
    if(email!=""){
        document.getElementsByClassName('overlay')[0].style.display="block";
        auth.sendPasswordResetEmail(email).then(function() {
            document.getElementsByClassName('overlay')[0].style.display="none";
            // Email sent.
            swal({
                title: "Check your email",
                text: "Follow the link on email to reset your password",
                icon: "success",
              })
          }).catch(function(error) {
            document.getElementsByClassName('overlay')[0].style.display="none";
            // An error happened.
            swal({
                title: "Error",
                text: "Check your email and enter again",
                icon: "error",
              })
          });
    }
    else{
        swal({
            title: "Error",
            text: "Enter email to reset password",
            icon: "error",
          })
          
    }
}

//Login_page_js_end

//Main_page_js_start

function logout_user(){
    auth.signOut();
    location.replace("./index.html")
}

function setDisplayName(){    
    if(user.displayName!=null){
        document.getElementById('display_username').innerText=user.displayName;
    }
} 

/*Changes start */
const  database = firebase.database();
var data;
database.ref().on('value',function(snapshot){
    data=snapshot.val();
})

var setEmail= function(){    
    var refvalue=document.getElementById('ref').value;
    
    if(refvalue=="Register yourself"){
        //document.getElementById('email_donor').readOnly=true;
        //do work
        document.getElementById('email_donor').readOnly=true;
        document.getElementById('email_donor').value=user.email;
    }
    else{
        
        document.getElementById('email_donor').value="";
        document.getElementById('email_donor').readOnly=false;
    }    
    }
function getdata(){
checkref();
}
/*Changes end */
//Main_page_js_end

//Donor_page_js_start

var firstName;var lastName;var dateob;var email_donors;var address_donor;
var address_donor;var age_donor;var phone_donor;var blood_grp;var reference;

function getValues(){
    
    firstName=document.getElementById("firstname").value;
     lastName=document.getElementById("lastname").value;
     dateob=document.getElementById("dateofb").value;
     email_donors=document.getElementById('email_donor').value;

     address_donor=document.getElementById("address").value;
     age_donor=document.getElementById("age").value;
     phone_donor=document.getElementById("phone_number").value;
     blood_grp=document.getElementById("selectpicker").value;
     reference=document.getElementById("ref").value;
}

function submitData(){
    getValues();
   
    if(firstName!=""&&lastName!=""&&dateob!=""&&email_donors!=""&&address_donor!=""&& phone_donor!="")
    
    {
        var userid;
        if(document.getElementById('ref').value=="Refer a person"){
            userid=user.email;
            var temp=userid.split(".");
            userid=temp[0];
            
            database.ref('Records/').push({
                name:firstName+" "+lastName,
                DateOfbirth:dateob,
                email:email_donors,
                Address:address_donor,
                Age:age_donor,
                Phone_Number:phone_donor,
                Blood_Group:blood_grp,
                Reference:user.email,
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
        else{
            userid=user.uid;
            database.ref('Records/'+userid).set({
                name:firstName+" "+lastName,
                DateOfbirth:dateob,
                email:email_donors,
                Address:address_donor,
                Age:age_donor,
                Phone_Number:phone_donor,
                Blood_Group:blood_grp,
                Reference:"Not referred",
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
}
else{
    swal({
        title: "Empty",
        text: "Some fields are empty!",
        icon: "error",
      })
}
}

function showage(){ 
var today=new Date();
var c_year=today.getFullYear();

var str=document.getElementById("dateofb").value;
var arr=str.split("-");
var Age=c_year-arr[0];
if(Age>6){
document.getElementById("age").value=Age;}
else{
    swal({
        title: "Error",
        text: "You must be 7 years old",
        icon: "error",
      })
      .then(res=>{
       document.getElementById('dateofb').value="";
      })
}
} 

function checkref(){
    
    var selection=localStorage.getItem("User_ref_selection");
    
    if(selection=="Yes"){
        document.getElementById('ref').options[0].innerText="Refer a person";
        document.getElementById('ref').readOnly=true;
    }
    else{
        //readonly true kar
        var ref=document.getElementById('ref');
        var opt='<option>Refer a person</option>';
        ref.innerHTML+=opt;
        ref.readOnly=false;
    }
}

 function regDonor(){
    
     database.ref('Records/'+user.uid).once('value',function(snapshot) {
        if(snapshot.exists()){
            
            swal({
                title: "You are already registered!",
                text: "Do you want to refer another person!",
                icon: "error",
                buttons: ["No","Yes"],
              })
              .then((res)=> {
                if(res){
                    //alert('sahi');
                    localStorage.setItem("User_ref_selection", "Yes");
                    location.replace("donor_reg_form.html");
                }
              })
        }
        else{
            //ask for himself or another person

            localStorage.setItem("User_ref_selection", "No");
            location.replace("donor_reg_form.html");
        }
        
      })
     //location.assign("donor_reg_form.html");
 }
var firebaseRef=firebase.database().ref();
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
        '<th style="border:1px solid black">Email</th>'+
        '<th style="border:1px solid black">Reference</th>'
         var content = '';

    if(snapshot.exists()){
   
    

    snapshot.forEach(function(data){
        
        var val = data.val();
      if(a=="Default" || a=="AB+"){
        
        
        content +='<tr style="border:1px solid black">';
        content+='<td style="border:1px solid black">'+t+'</td>';
        content += '<td style="border:1px solid black">' + val.name + '</td>';
        content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
        content += '<td style="border:1px solid black">' + val.Age+ '</td>';
        content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
        content += '<td style="border:1px solid black">' + val.Address+ '</td>';
        content += '<td style="border:1px solid black">' + val.email+ '</td>';
        content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
        
        content += '</tr>';
        t++;}
     else{
         
          if(a=="A+"){
              if(val.Blood_Group=="A+" ||val.Blood_Group=="A-"||val.Blood_Group=="O+"||val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else if(a=="O+"){
            if(val.Blood_Group=="O+"||val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else if(a=="B+"){
            if(val.Blood_Group=="B+"||val.Blood_Group=="B-"||val.Blood_Group=="O+"||val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else if(a=="A-"){
            if(val.Blood_Group=="A-"||val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else if(a=="O-"){
            if(val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else if(a=="B-"){
            if(val.Blood_Group=="O-"||val.Blood_Group=="B-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';     
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
          else { //AB-
            if(val.Blood_Group=="AB-"||val.Blood_Group=="A-"||val.Blood_Group=="B-"||val.Blood_Group=="O-" ){
                content +='<tr style="border:1px solid black">';
                content+='<td style="border:1px solid black">'+t+'</td>';
                content += '<td style="border:1px solid black">' + val.name + '</td>';
                
                content += '<td style="border:1px solid black">' + val.Blood_Group+ '</td>';
                content += '<td style="border:1px solid black">' + val.Age+ '</td>';
                content += '<td style="border:1px solid black">' + val.Phone_Number+ '</td>';
                content += '<td style="border:1px solid black">' + val.Address+ '</td>';
                content += '<td style="border:1px solid black">' + val.email+ '</td>';
                content += '<td style="border:1px solid black">' + val.Reference+ '</td>';
                content += '</tr>';
                t++;
              }
          }
      }
     
    });
    //$('#ex-table').append(content);
  
   
   if(content!="")
    document.getElementById("ex-table").innerHTML=s+content;
 else{
    //document.getElementById("ex-table").innerHTML=s+"<h1>No Record<h1>";
    document.getElementById("ex-table").innerHTML=s+'<tr>'+'<td colspan="8">'+'<h1 class="text-center">No Record<h1>'+ '</td>'+ '</tr>';
 }
}
else{
    s+='</tr>';
    document.getElementById("ex-table").innerHTML=s+'<tr>'+'<td colspan="8">'+'<h1 class="text-center">No Record<h1>'+ '</td>'+ '</td>' +'</tr>';
}
});

setTimeout(function(){
    document.getElementsByClassName('overlay')[0].style.display="none";
},2000);
}

function goBack(){
    location.replace("main_page.html");
}
//Donor_page_js_end