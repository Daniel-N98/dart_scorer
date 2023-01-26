import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signInUser } from "../../firebase/userAuth.js";

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
      <Form id="sign-in-page-form">
        <h3>Sign In</h3>
        <Form.Label htmlFor="email">
          Email
          <Form.Control type="email" autoComplete="on" />
        </Form.Label>
        <Form.Label htmlFor="password">
          Password
          <Form.Control type="password" autoComplete="on" />
        </Form.Label>
        <Button
          type="submit"
          variant="dark"
          className="d-block m-auto"
          onClick={(e) => handleClick(e)}
        >
          Sign in
        </Button>
      </Form>
    </section>
  );
}
