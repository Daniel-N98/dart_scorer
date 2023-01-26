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
  const stats = await getPlayerStats(userID);
  return stats.online_wins;
}

export async function getPlayerOnlineLosses(userID) {
  const stats = await getPlayerStats(userID);
  return stats.online_losses;
}

export async function createOnlineGame({
  start_score = 301,
  sets = 3,
  legs = 3,
  publicMatch,
}) {
  const user = auth.currentUser;
  const join_code = Math.random().toString(36).substring(2, 7);
  const doc = {
    p1: {
      uid: user.uid,
      name: user.displayName,
      score: start_score,
      sets: 0,
      legs: 0,
      dart_scores: { set1: { leg1: [] } },
    },
    start_score,
    sets,
    legs,
    status: "pending",
    turn: "p1",
    leg_start: "p1",
    date: Date.now(),
  };
  if (!publicMatch) {
    doc.join_code = join_code;
  }
  try {
    const docRef = await addDoc(collection(db, "games"), {
      ...doc,
    });
    return { gameID: docRef.id, join_code };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function gameExists(user) {
  if (!user) return;
  const querySnapshot = await getDocs(collection(db, "games"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      const { p1, p2 } = doc.data();
      if ((p1 && p1.uid === user.uid) || (p2 && p2.uid === user.uid)) {
        exists = { gameID: doc.id, join_code: doc.data().join_code };
      }
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

export async function getDocumentById(
  collectionName,
  documentID,
  idIsProperty
) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let document = null;
  querySnapshot.forEach((doc) => {
    if (idIsProperty) {
      if (doc.data() && doc.data()[idIsProperty] === documentID)
        document = doc.data();
    } else {
      if (doc.id === documentID) document = doc.data();
    }
  });

  return document;
}

export default async function updateGameDocument(documentId) {
  const matchObj = await getDocumentById("games", documentId);
  if (!matchObj || (matchObj.p1 && matchObj.p2)) {
    return false;
  }
  const { start_score } = matchObj;
  const user = auth.currentUser;
  const docRef = doc(db, "games", documentId);
  await updateDoc(docRef, {
    p2: {
      uid: user.uid,
      name: user.displayName,
      score: start_score,
      sets: 0,
      legs: 0,
      dart_scores: { set1: { leg1: [] } },
    },
    status: "in-progress",
  });
  return true;
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

export async function addMatchToCompletedGames(documentId) {
  const matchRef = await getDocumentById("games", documentId);
  try {
    await addDoc(collection(db, "completed_games"), {
      ...matchRef,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function getDocumentIdByPropertyValue(
  collectionName,
  property,
  value
) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let documentId = null;
  querySnapshot.forEach((doc) => {
    if (doc.data() && doc.data().hasOwnProperty(property)) {
      if (doc.data()[property] === value) {
        documentId = doc.id;
      }
    }
  });
  return documentId;
}

export async function updatePlayerWinsLosses({ winnerUid, loserUid }) {
  const winnerWins = await getPlayerOnlineWins(winnerUid);
  const winnerStatDocId = await getDocumentIdByPropertyValue(
    "user_statistics",
    "uid",
    winnerUid
  );
  const loserLosses = await getPlayerOnlineLosses(loserUid);
  const loserStatDocId = await getDocumentIdByPropertyValue(
    "user_statistics",
    "uid",
    loserUid
  );

  await updateDocument(
    "user_statistics",
    winnerStatDocId,
    { online_wins: winnerWins + 1 },
    true
  );
  await updateDocument(
    "user_statistics",
    loserStatDocId,
    { online_losses: loserLosses + 1 },
    true
  );
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

export async function getPublicMatches() {
  const querySnapshot = await getDocs(collection(db, "games"));
  let documents = [];
  querySnapshot.forEach((doc) => {
    if (!doc.data().join_code && doc.data().status === "pending") {
      const matchObject = doc.data();
      matchObject.gameID = doc.id;
      documents.push(matchObject);
    }
  });
  return documents;
}
