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

onload = () => {
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



    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var assos = "";
    var uid = localStorage.getItem('userId');
    console.log(uid);
    onValue(ref(database,`AssociationAdmins/${uid}/`),snap =>{
            assos = snap.val().association;
            console.log("assos - " + assos);

            localStorage.setItem("assos", assos);

            onValue(ref(database,`/associations/${assos}/owners/`),function(snapshot){
                console.log(`/associations/${assos}/owners/`);
                snapshot.forEach(function(snap){
                    
                    var snapKey = snap.key;
                    var snapData = snap.val();
        
                    console.log("snapKey - "+snapKey+"; snapData - "+ snapData);
        
                    var trr = document.createElement("tr");
                    trr.innerHTML = `<td scope="row" class="scope">${snapData['ownerFlat']}</td><td>${snapData['ownerName']}</td><td>${snapData['ownerEmail']}</td><td>${snapData['ownerPhone']}</td>
                    
                    <td><button data-bs-toggle="modal" data-email="${snapData['ownerEmail']}" data-bs-target="#postModal" id="${snapData[uid]}" class="btn btn-primary">Send Post</a></td>`;
        
                    document.getElementById("tbodyy").appendChild(trr);
                });
            });
    });

    
}
function abc(email) {
    localStorage.setItem("sendEmail", email);
}

document.addEventListener("click",e=>{
    if(e.target.matches('button')){
        console.log('clicked button');

        var data = e.target.dataset.email;
        localStorage.setItem("sendEmail",data)
    }    
});

sub.addEventListener('click', e =>{
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var sendKey = '';

    onValue(ref(database,`/associations/${localStorage.getItem("assos")}/owners/`),snapshot =>{
        snapshot.forEach(snap => {
            var snapKey = snap.key;
            var snapData = snap.val();

            console.log(`Snap Key - ${snapKey} SnapData - ${snapData}`);

            if (snapData['ownerEmail'] == localStorage.getItem('sendEmail')) {
                console.log('same');

                sendKey = snapKey;
            }else{
                console.log('not same');
            }
        });
        var time = new Date();
        set(ref(database,`/posts/${sendKey}/${time.getTime()}/`),{
            subject: subject,
            message: message
        });
    });

    /**/
});