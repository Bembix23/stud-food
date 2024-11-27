import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "studfood-ff848.firebaseapp.com",
  projectId: "studfood-ff848",
  storageBucket: "studfood-ff848.appspot.com",
  messagingSenderId: "846305118435",
  appId: "1:846305118435:web:1369b55a5375fb52981dd6",
  measurementId: "G-11YSGYZ8T0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
