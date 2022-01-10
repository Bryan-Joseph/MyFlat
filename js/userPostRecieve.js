// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getDatabase , ref , set , update , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";
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


    var userId = localStorage.getItem("ownerUid");

    if (userId == null || userId == '') {
        swal({
            title: "Error",
            text: "No Owner Signed in.",
            icon: "error",
        }).then(()=>{
            window.location.replace("index.html");
        });
    }else{

        console.log('sdfdwggggggggggggggggggggggggggggggggggg');
    
            

            onValue(ref(database,`associations/`),snapshot=>{
                snapshot.forEach(snap => {
                    var snapK = snap.key;

                    console.log(`from userPostRecieve: snapK - ${snapK}`);
                    onValue(ref(database,`associations/${snapK}/owners`),snapsho=>{
                        snapsho.forEach(snaps => {
                            var snapsK = snaps.key;
                            var snapsD = snaps.val();

                            var ownerUid = localStorage.getItem('ownerUid');

                            console.log(`from userPostRecieve: snapsK - ${snapsK} ;; ownerUid - ${ownerUid}`);

                            if (snapsK == ownerUid) {
                                console.log('same');
                                var association = snapsD['ownerAssos'];
                                console.log(`owner assos - ${association}`);

                                onValue(ref(database,`collections/${association}/`),sn=>{

                                    document.getElementById('div1').innerHTML = '';
                                    sn.forEach(s=>{
                                        var sK = s.key;
                                        var sD = s.val();

                                        var date = new Date(Number(s.key));
                                        var month = date.getMonth() + 1;
                                        var day = date.getDate();
                                        var year = date.getFullYear();
                                        var hour = date.getHours();
                                        var minute = date.getMinutes();

                                        var html = `<div class="bg-warning mx-4 mt-4 p-3 " style="border-radius: 20px;">
                                            <div class="text-white pt-2  ">
                                                <h5 class="d-inline-block mr-1">${sD['subject']}</h5>
                                                <button data-del=${sK} data-assos="${association}" style='background-color: transparent;border: transparent;'><img style="margin-bottom: 8px" src="img/trash.png" width="26px"></button>
                                                <h6 class="text-right">${day}/${month}/${year}</h6>
                                                <h6 class="text-right">${hour}:${minute}</h6>
                                                <hr>
                                                <p>${sD['message']}</p>
                                                </;>
                                            </div>`;


                                        document.getElementById('div1').innerHTML += html;    
                                    })
                                    onValue(ref(database,`posts/${localStorage.getItem('ownerUid')}/`),snapshot =>{
                                        document.getElementById('div2').innerHTML = '';
                                        snapshot.forEach((snap =>{
                                            var snapK = snap.key;
                                            var snapD = snap.val();
                                
                                            console.log(`From userPostRecieve: snapK - ${snapK} ;;; snapD - ${snapD}`);
                                
                                            var date = new Date(Number(snapK));
                                            console.log(date);
                                            console.log();
                                
                                            var html = `<div class="bg-primary mx-4 mt-4 p-3 " style="border-radius: 20px;">
                                            <div class="text-white pt-2  ">
                                                <h5 class="d-inline-block mr-1">${snapD['subject']}</h5>
                                                <button data-delete=${snapK} style='background-color: transparent;border: transparent;'><img style="margin-bottom: 8px" src="img/trash.png" width="26px"></button>
                                                <h6 class="text-right">${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</h6>
                                                <h6 class="text-right">${date.getHours()}:${date.getMinutes()}</h6>
                                                <hr>
                                                <p>${snapD['message']}</p>
                                            </;>
                                        </div>`
                                
                                        document.getElementById('div2').innerHTML += html;
                                        }));
                                    });
                                })

                                

                                onValue(ref(database,`AssociationAdmins/`),snapshots=>{
                                    console.log('dddddddddddddddddddddddddd');
                                    snapshots.forEach(sna => {
                                        var snaK = sna.key;
                                        var snaD = sna.val();

                                        if (snaD['association'] == association) {
                                            console.log('same twinzzes');
                                            document.getElementById('adminName').innerHTML = snaD['adminName'];
                                            document.getElementById('adminPhone').innerHTML = snaD['phoneNumber'];
                                            document.getElementById('adminEmail').innerHTML = snaD['email'];

                                            
                                        }
                                    });
                                })
                            }
                        });
                    })
                });
            })
            
        
    }
}

document.addEventListener('click',e=>{
    if (e.target.matches('button')) {
        var data = e.target.dataset.delete;
        var del = e.target.dataset.del;
        var assos = e.target.dataset.assos
        console.log(data);
        if (data !=null) {
            remove(ref(database,`posts/${localStorage.getItem('ownerUid')}/${data}`))
        }else if (del != null && assos != null) {
            remove(ref(database,`collections/${assos}/${del}`))
        }
        

        console.log(localStorage.getItem('ownerUid'));
    }else if (e.target.matches('img')){
        var data = e.target.parentElement.dataset.delete;
        var del = e.target.parentElement.dataset.del;
        var assos = e.target.parentElement.dataset.assos
        console.log(data);
        if (data != null) {
            remove(ref(database,`posts/${localStorage.getItem('ownerUid')}/${data}`))
        }else if (del != null && assos != null) {
            remove(ref(database,`collections/${assos}/${del}`))
        }
        
    }
});