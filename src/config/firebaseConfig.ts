// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYQKQ9EYrkKPz53a4x1WySCOgYLrIUC2Y",
  authDomain: "hackathone-1.firebaseapp.com",
  projectId: "hackathone-1",
  storageBucket: "hackathone-1.appspot.com",
  messagingSenderId: "1015640618887",
  appId: "1:1015640618887:web:75d34c441d152b2f618522",
  measurementId: "G-NF95E64JRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const obj = getDatabase(app)

export default app;