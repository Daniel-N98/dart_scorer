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
  setDoc,
  deleteDoc,
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
      updateUserDisplayName(user, displayName).then(async () => {
        await addBaseStats(user.uid);
        return true;
      });
    })
    .catch(() => {
      alert("Failed to register");
      return false;
    });
}

async function addBaseStats(userID) {
  try {
    const docRef = await addDoc(collection(db, "user_statistics"), {
      uid: userID,
      online_wins: 0,
      online_losses: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
}

export async function getPlayerStats(userID) {
  const querySnapshot = await getDocs(collection(db, "user_statistics"));
  let data = false;
  querySnapshot.forEach((doc) => {
    if (doc.data().uid === userID) {
      data = doc.data();
    }
  });
  return data;
}

export async function getPlayerOnlineWins(userID) {
  const stats = getPlayerStats(userID);
  return stats.online_wins;
}

export async function getPlayerOnlineLosses(userID) {
  const stats = getPlayerStats(userID);
  return stats.online_losses;
}

// async function updatePlayerWins(documentId, statsObject) {
//   const docRef = doc(db, "user_statistics", documentId);
//   await updateDoc(
//     docRef,
//     {
//       ...statsObject,
//     },
//     { merge: true }
//   );
// }

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

export async function createOnlineGame({
  start_score = 301,
  sets = 3,
  legs = 3,
}) {
  const user = getAuth().currentUser;
  const join_code = Math.random().toString(36).substring(2, 7);
  try {
    const docRef = await addDoc(collection(db, "games"), {
      p1: {
        uid: user.uid,
        name: user.displayName,
        score: start_score,
        sets: 0,
        legs: 0,
        dart_scores: [],
      },
      start_score,
      sets,
      legs,
      join_code,
      status: "pending",
      turn: "p1",
      date: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { gameID: docRef.id, join_code };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function gameExists(user) {
  const querySnapshot = await getDocs(collection(db, "games"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().p1 && doc.data().p1.uid === user.uid) {
      exists = { gameID: doc.id, join_code: doc.data().join_code };
    }
  });
  return exists;
}

export async function gameExistsWithCode(joinCode) {
  const querySnapshot = await getDocs(collection(db, "games"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().join_code === joinCode) {
      exists = doc.id;
    }
  });
  return exists;
}

export default async function updateGameDocument(documentId) {
  const docRef = doc(db, "games", documentId);
  const { start_score } = await getMatchFromId(documentId);
  const user = getAuth().currentUser;
  await updateDoc(docRef, {
    p2: {
      uid: user.uid,
      name: user.displayName,
      score: start_score,
      sets: 0,
      legs: 0,
      dart_scores: [],
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

export async function getFinishedMatch(matchId) {
  const querySnapshot = await getDocs(collection(db, "completed_games"));
  let document = null;
  querySnapshot.forEach((doc) => {
    if (doc.data().gameID === matchId) document = doc.data();
  });

  return document;
}

export async function updatePlayerScore(documentId, thrownScore) {
  const docRef = doc(db, "games", documentId);
  const matchRef = await getMatchFromId(documentId);
  const turn = matchRef.turn;
  const { dart_scores } = matchRef[turn];

  await setDoc(
    docRef,
    {
      [matchRef.turn]: {
        dart_scores: dart_scores.concat(thrownScore),
      },
    },
    { merge: true }
  );
}

export async function updatePlayerDocument(documentId, updateObj) {
  const docRef = doc(db, "games", documentId);
  await setDoc(
    docRef,
    {
      ...updateObj,
    },
    { merge: true }
  );
}

export async function deleteGameDocument(documentID) {
  const docRef = doc(db, "games", documentID);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

export async function addMatchToCompletedGames(documentID) {
  const matchRef = await getMatchFromId(documentID);
  try {
    const docRef = await addDoc(collection(db, "completed_games"), {
      ...matchRef,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
