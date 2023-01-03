import { registerUser } from "../firebase";

export default function Register() {
  const handleClick = (e) => {
    e.preventDefault();
    const formElements = document.getElementById("register-page-form").elements;
    if (
      registerUser(
        formElements[0].value,
        formElements[1].value,
        formElements[2].value
      )
    ) {
      window.location.href = "/";
    }
  };

  return (
    <section id="register-page">
      <form id="register-page-form">
        <h3>Register</h3>
        <label htmlFor="email">Email</label>
        <input type="email" />
        <label htmlFor="password">Password</label>
        <input type="password" />
        <label htmlFor="username">Username</label>
        <input type="text" />
        <input type="submit" onClick={(e) => handleClick(e)} />
      </form>
    </section>
  );
}
