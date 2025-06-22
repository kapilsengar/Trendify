import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API, // ✅ Also fix this key name
  authDomain: "login-trendify.firebaseapp.com",
  projectId: "login-trendify",
  storageBucket: "login-trendify.firebasestorage.app",
  messagingSenderId: "501293241023",
  appId: "1:501293241023:web:639ba45ad6d517a2b52c0a"
};

// ✅ Initialize app first
const app = initializeApp(firebaseConfig);

// ✅ Then use app
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
