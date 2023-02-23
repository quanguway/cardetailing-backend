import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCVwQdUQ4rz-rLrLYkQ8Qh0GDYgRTpqzq4",
  authDomain: "car-detailing-374816.firebaseapp.com",
  projectId: "car-detailing-374816",
  storageBucket: "car-detailing-374816.appspot.com",
  messagingSenderId: "948637728188",
  appId: "1:948637728188:web:5abad15049cc63ed85bfb9",
  measurementId: "G-E437Q3CXE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }