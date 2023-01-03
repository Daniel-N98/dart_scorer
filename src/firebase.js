import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxAQ4NHWyEaU6-VSGQyRwKH2RBaTCYsTg",
  authDomain: "dart-score-v2.firebaseapp.com",
  projectId: "dart-score-v2",
  storageBucket: "dart-score-v2.appspot.com",
  messagingSenderId: "316323012732",
  appId: "1:316323012732:web:4e790b8779fb35390da9f9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
