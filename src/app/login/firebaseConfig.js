import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAV9yLJvSV0u7fCOUCkfILh1-JFoanQv04",
    authDomain: "social-media-login-page.firebaseapp.com",
    projectId: "social-media-login-page",
    storageBucket: "social-media-login-page.appspot.com",
    messagingSenderId: "14651204568",
    appId: "1:14651204568:web:36adba86f185b8adb388ad",
    databaseURL:"https://social-media-login-page-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
