import { signInUser } from "../../firebase";

export default function SignIn() {
  const handleClick = (e) => {
    e.preventDefault();
    const formElements = document.getElementById("sign-in-page-form").elements;
    signInUser(formElements[0].value, formElements[1].value)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        alert("Failed to sign in.");
      });
  };

  return (
    <section id="sign-in-page">
      <form id="sign-in-page-form">
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <input type="email" />
        <label htmlFor="password">Password</label>
        <input type="password" />
        <input type="submit" onClick={(e) => handleClick(e)} />
      </form>
    </section>
  );
}
