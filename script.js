import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6bgLk52L4RL64K6g6M-cqEr7hytM7Mq8",
    authDomain: "attendance-app-28cd2.firebaseapp.com",
    databaseURL: "https://attendance-app-28cd2-default-rtdb.firebaseio.com",
    projectId: "attendance-app-28cd2",
    storageBucket: "attendance-app-28cd2.appspot.com",
    messagingSenderId: "1063572994138",
    appId: "1:1063572994138:web:8a657853aca0ffde894063",
    measurementId: "G-LK4GTLGL7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const db = getDatabase();

let enterID = document.querySelector("#enterID");
let enterName = document.querySelector("#enterName");
let enterRoll = document.querySelector("#enterRoll");

let findID = document.querySelector("#findID");
let findName = document.querySelector("#findName");
let findRoll = document.querySelector("#findRoll");
let StudentID = document.querySelector("#StudentID");
let findClass = document.querySelector("#findClass");

let insertBtn = document.querySelector("#insert");
let updateBtn = document.querySelector("#update");
let removeBtn = document.querySelector("#remove");
let findBtn = document.querySelector("#find");

// adding students details
function InsertData() {
    set(ref(db, `Class/${enterClass.value}/${enterID.value}`), {
        Name: enterName.value,
        StudentID: enterID.value,
        Rollno: enterRoll.value
    })
        .then(() => {
            alert("Data added successfully");
        })
        .catch((error) => {
            alert(error);
        });
}

//finding students details
function FindData() {
    const dbref = ref(db);

    get(child(dbref, `Class/${findClass.value}//${findID.value}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                findName.innerHTML = "Name: " + snapshot.val().Name;
                findRoll.innerHTML = "Roll no: " + snapshot.val().Rollno;
                StudentID.innerHTML = "Student ID: " + snapshot.val().StudentID;
            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert(error)
        })

}

//Updating students details
function UpdateData() {
    update(ref(db, `Class/${enterClass.value}/${enterID.value}`), {
        Name: enterName.value,
        Rollno: enterRoll.value
    })
        .then(() => {
            alert("Data updated successfully");
        })
        .catch((error) => {
            alert(error);
        });
}

//removeing students details
function RemoveData() {
    remove(ref(db, `Class/${enterClass.value}/${enterID.value}`))
        .then(() => {
            alert("Data deleted successfully");
        })
        .catch((error) => {
            alert(error);
        });
}

insertBtn.addEventListener('click', InsertData);
updateBtn.addEventListener('click', UpdateData);
removeBtn.addEventListener('click', RemoveData);
findBtn.addEventListener('click', FindData);

