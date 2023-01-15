import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYkDuh0iffQoKAtQeAamHVodrWQy2KYBk",
  authDomain: "ngou-quizlet.firebaseapp.com",
  projectId: "ngou-quizlet",
  storageBucket: "ngou-quizlet.appspot.com",
  messagingSenderId: "176802875167",
  appId: "1:176802875167:web:85c3254c901844fe08922a",
  measurementId: "G-Q3CNY71G6N"
};

const app = initializeApp(firebaseConfig);
export default app;