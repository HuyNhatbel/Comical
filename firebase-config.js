// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpOWvpr23H_bxtja_Q4r5xlVCPvy2XJmM",
    authDomain: "something-405b6.firebaseapp.com",
    projectId: "something-405b6",
    storageBucket: "something-405b6.firebasestorage.app",
    messagingSenderId: "50874984634",
    appId: "1:50874984634:web:d5156085b2a764baf47a83",
    measurementId: "G-CCCGP37GVT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add data to Firestore
export async function addUserToFirestore(data) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...data,
            createdAt: new Date(),
        });
        console.log("Document written with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
}

// Get data from Firestore
export async function getUsersFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting documents:", error);
        throw error;
    }
}

// Upload file to Firebase Storage
export function uploadFile(file, onProgress, onComplete, onError) {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(progress);
        },
        (error) => {
            if (onError) onError(error);
        },
        async () => {
            try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                if (onComplete) onComplete(downloadURL);
            } catch (error) {
                if (onError) onError(error);
            }
        }
    );
}

// Delete file from Firebase Storage
export async function deleteFileByUrl(imageUrl) {
    try {
        const urlObj = new URL(imageUrl);
        const path = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
        console.log("File deleted successfully!");
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}

// Register user with email and password
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

// Login user with email and password
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

// Login with Google
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error logging in with Google:", error);
        throw error;
    }
}

// Logout user
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

// Monitor Auth State
export function onAuthChange(callback) {
    onAuthStateChanged(auth, callback);
}