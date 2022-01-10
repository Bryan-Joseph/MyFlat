// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getDatabase , ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";

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


    onValue(ref(database,`Files/Expense/${localStorage.getItem('userId')}/${localStorage.getItem('currentFile')}`), snapshot => {
        var i = 0;
        snapshot.forEach(snap =>{
            var snapD = snap.val();

            var row = document.createElement("tr");
            row.innerHTML = `<td class="row">${snapD['category']}</td> <td class="text-left">${snapD['amount']}</td> <td class="text-left">${snapD['description']}</td>`;
            i += Number(snapD['amount']);
            console.log(i);
            document.getElementById('tbodyy').appendChild(row);
        });
        var row = `<td class="row"><b class="text-left">Total :</b></td> <td class="text-left"><b >${i}</b></td> <td></td>`;
        document.getElementById('tbodyy').innerHTML += row;
    });    
}