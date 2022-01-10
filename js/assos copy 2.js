// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getDatabase , ref , set , update , push , onValue } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPov4j98DjAwa4Qx3Ttjnuxb_h8LzZ0NM",
    authDomain: "myflat-9ca42.firebaseapp.com",
    projectId: "myflat-9ca42",
    storageBucket: "myflat-9ca42.appspot.com",
    messagingSenderId: "859984206708",
    appId: "1:859984206708:web:5845e58b337760702b6a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

//var assosId = document.getElementById('assosId').value;
//var assosAddress = document.getElementById('assosAddress').value;

registerAssos.addEventListener('click',() => {
    var assosIds = document.getElementById('assosId').value;
    var assosAddress = document.getElementById('assosAddress').value;

    var assosAdminEmail = document.getElementById('assosAdminEmail').value;
    var assosAdminPass = document.getElementById('assosAdminPass').value;
    var assosAdminName = document.getElementById('assosAdminName').value;
    var assosAdminPhoneNum = document.getElementById('assosAdminPhoneNum').value;
    var assosId = document.getElementById('assosId').value;

    var isDifferent = true;
    var isDone = false;

    createUserWithEmailAndPassword(auth,assosAdminEmail,assosAdminPass)
    .then(us => {
        const user = us.user;
        set(ref(database,"/AssociationAdmins/" + user.uid + "/"),{
            adminName: assosAdminName,
            phoneNumber: assosAdminPhoneNum,
            association: assosId,
            associationAddress: assosAddress,
            email: user.email,
        }).then(()=>{
            //alert('Successfully added user');
            swal({
                title: "Success",
                text: "Successfully added user!",
                icon: "success",
            });
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(errorMessage);
        alert('Error: ' + errorMessage);
    });

});

loginAdmin.addEventListener('click',() => {
    var assosAdminEmail = document.getElementById('assosAdminEmailLogin').value;
    var assosAdminPass = document.getElementById('assosAdminPassLogin').value;

    signInWithEmailAndPassword(auth,assosAdminEmail,assosAdminPass)
    .then(()=> {
        console.log("user successfully logged in");
        swal({
            title: "Success",
            text: "User Successfully Loged In!",
            icon: "success",
        });
        var user = auth.currentUser;
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.uid);
    })
    .catch(error =>{
        console.error(error.message);
    })
})


/*createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });



signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });


function signUp(email,password) {
    
}*/ 
 