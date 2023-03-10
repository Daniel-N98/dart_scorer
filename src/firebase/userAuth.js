import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";

export function registerUser(userEmail, userPassword, displayName) {
  if (!validateDisplayName(displayName)) {
    return false;
  }
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(() => {
      const user = auth.currentUser;
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

export async function signInUser(userEmail, userPassword) {
  return signInWithEmailAndPassword(auth, userEmail, userPassword);
}

export async function signOutUser() {
  signOut(auth);
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

async function addBaseStats(userID) {
  try {
    await addDoc(collection(db, "user_statistics"), {
      uid: userID,
      online_wins: 0,
      online_losses: 0,
    });
  } catch (error) {
    alert("Failed to add statistics");
  }
}
