import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8ru_MndeC9rtX515L_EVrB8hoEYt3tWk",
  authDomain: "ledi-ai-software.firebaseapp.com",
  projectId: "ledi-ai-software",
  storageBucket: "ledi-ai-software.appspot.com",
  messagingSenderId: "854109065705",
  appId: "1:854109065705:web:b878c3f8664a939dfa3b78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
