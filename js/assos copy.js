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

onload = () =>{
    console.log('sdssssssssssssssssdddddddddddddddddddd');

    var ownerUid = localStorage.getItem('ownerUid');
    var ownerEmail = localStorage.getItem('ownerEmail');

    var adminId = localStorage.getItem('userId');
    var adminEmail = localStorage.getItem('userEmail');

    if (adminId != null && adminEmail != null) {
        document.getElementById('log').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
        onValue(ref(database,`AssociationAdmins/${adminId}/`),snap=>{
            var name = snap.val().adminName;
            document.getElementById('namebox').innerHTML = `Welcome, ${name}`;
        });
    }else if(ownerUid != null && ownerEmail!= null){
        document.getElementById('log').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
        onValue(ref(database,`associations/`),snapshot => {
            snapshot.forEach(snap=>{
                var snapK = snap.key;
                onValue(ref(database,`associations/${snapK}/owners/${ownerUid}`),s=>{
                    var name = s.val().ownerName;
                    document.getElementById('namebox').innerHTML = `Welcome, ${name}`;
                })
            })
        })

    }else{
        document.getElementById('log').style.display = 'inline-block';
    }

    logout.addEventListener('click',()=>{
        localStorage.removeItem('ownerUid');
        localStorage.removeItem('ownerEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');

        document.getElementById('log').style.display = 'inline-block';
        document.getElementById('logout').style.display = 'none';

        window.location.replace('index.html');
    });

}

//var assosId = document.getElementById('assosId').value;
//var assosAddress = document.getElementById('assosAddress').value;

registerAssos.addEventListener('click',() => {
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

            localStorage.setItem("userEmail", assosAdminEmail);
                localStorage.setItem("userId", user.uid);
            swal({
                title: "Success",
                text: "Successfully added user!",
                icon: "success",
            }).then(()=>{
                
                
                window.location.replace('adminDashboard.html');

            });
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(errorMessage);
        swal({
            title: "Error",
            text: errorMessage,
            icon: "error",
        });
    });

});