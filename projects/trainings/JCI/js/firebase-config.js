/**
 * Firebase Configuration and Initialization
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMMKNXIwxYypbwafDmFPf6iS41F4ct1Xk",
    authDomain: "jci-quiz.firebaseapp.com",
    projectId: "jci-quiz",
    storageBucket: "jci-quiz.firebasestorage.app",
    messagingSenderId: "38540358649",
    appId: "1:38540358649:web:550737f41f1c3ee2014328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
export const db = getFirestore(app);
export const auth = getAuth(app);
