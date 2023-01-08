import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [user] = useAuthState(getAuth());
  return (
    <section id="user-profile">
      <p>Display name: {user.displayName}</p>
    </section>
  );
}
