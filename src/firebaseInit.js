// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCUf90u_QNaFueAKx5dTZRdIcBX4rK3mE",
  authDomain: "blogging-app-2032b.firebaseapp.com",
  projectId: "blogging-app-2032b",
  storageBucket: "blogging-app-2032b.appspot.com",
  messagingSenderId: "122087804277",
  appId: "1:122087804277:web:9232698332485d8778173c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
