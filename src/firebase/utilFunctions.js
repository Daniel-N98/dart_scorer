import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

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

export async function createOnlineGame({
  start_score = 301,
  sets = 3,
  legs = 3,
}) {
  const user = auth.currentUser;
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
  const user = auth.currentUser;
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

export async function updateDocument(
  collection,
  documentID,
  updateObject,
  merge
) {
  const docRef = doc(db, collection, documentID);
  await setDoc(
    docRef,
    {
      ...updateObject,
    },
    { merge: merge }
  );
}
