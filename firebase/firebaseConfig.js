import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyALcDd8vkoQ4zZ4fWCJ2ZkMwfhOUhREoIA",
  authDomain: "sealme-fb2f9.firebaseapp.com",
  databaseURL: "https://sealme-fb2f9-default-rtdb.firebaseio.com",
  projectId: "sealme-fb2f9",
  storageBucket: "sealme-fb2f9.firebasestorage.app",
  messagingSenderId: "23725280102",
  appId: "1:23725280102:web:b5595ed617115f376d16a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function anonymouslySignIn(){
  signInAnonymously(auth)
  .then(() => {
    console.log("User signed in anonymously");
  })
  .catch((error) => {
    console.error("Error during anonymous sign-in:", error);
  });
}


async function sendMessage(){
      // Reference to the sub-collection "chats" within the newly created document
    const chatsCollectionRef = collection(docRef, "chats");

    // Add a document to the "chats" sub-collection
    await addDoc(chatsCollectionRef, {
      message: "Welcome to the chat!",
      timestamp: new Date(),
      sender: "Admin"
    });

    console.log("Sub-collection document created successfully.");
}

export {db}