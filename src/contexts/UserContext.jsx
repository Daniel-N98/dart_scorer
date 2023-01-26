import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth } from "../firebase/firebase";

const UserContext = createContext();

function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
