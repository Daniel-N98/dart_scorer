import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxAQ4NHWyEaU6-VSGQyRwKH2RBaTCYsTg",
  authDomain: "dart-score-v2.firebaseapp.com",
  projectId: "dart-score-v2",
  storageBucket: "dart-score-v2.appspot.com",
  messagingSenderId: "316323012732",
  appId: "1:316323012732:web:4e790b8779fb35390da9f9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function registerUser(userEmail, userPassword, displayName) {
  if (!validateDisplayName(displayName)) {
    alert("Username is not valid.");
    return false;
  }
  createUserWithEmailAndPassword(getAuth(), userEmail, userPassword)
    .then(() => {
      const user = getAuth().currentUser;
      updateUserDisplayName(user, displayName).then(() => {
        return true;
      });
    })
    .catch(() => {
      alert("Failed to register");
      return false;
    });
}

export async function signInUser(userEmail, userPassword) {
  return signInWithEmailAndPassword(getAuth(), userEmail, userPassword);
}

export async function updateUserDisplayName(user, displayName) {
  await updateProfile(user, {
    displayName,
  });
}

function validateDisplayName(displayName) {
  if (displayName.length < 6 || displayName.length > 14) return false;
  if (displayName.indexOf(" ") >= 0) return false;
  if (/d/.test(displayName)) return false;
  return true;
}

export async function createOnlineGame() {
  const user = getAuth().currentUser;
  try {
    const docRef = await addDoc(collection(db, "games"), {
      p1: { uid: user.uid, score: 501, sets: 0, legs: 0 },
      start_score: 501,
      sets: 2,
      legs: 3,
      join_code: 1234,
      status: "pending",
    });
    console.log("Document writted with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function gameExists(user) {
  const querySnapshot = await getDocs(collection(db, "games"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().p1 && doc.data().p1.uid === user.uid) {
      exists = true;
    }
  });
  return exists;
}

export async function gameExistsWithCode(joinCode) {
  const querySnapshot = await getDocs(collection(db, "games"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().join_code === Number(joinCode)) {
      exists = doc.id;
    }
  });
  return exists;
}

export default async function updateGameDocument(documentId) {
  const docRef = doc(db, "games", documentId);
  const user = getAuth().currentUser;
  await updateDoc(docRef, {
    p2: {
      uid: user.uid,
      score: 501,
      sets: 0,
      legs: 0,
    },
    status: "in-progress",
  });
}

export async function getMatchFromId(matchId) {
  const querySnapshot = await getDocs(collection(db, "games"));
  let document = null;
  querySnapshot.forEach((doc) => {
    if (doc.id === matchId) document = doc.data();
  });

  return document;
}
