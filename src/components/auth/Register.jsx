import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerUser } from "../../firebase/userAuth.js";

export default function Register() {
  const handleClick = (e) => {
    e.preventDefault();
    const formElements = document.getElementById("register-page-form").elements;
    if (
      registerUser(
        formElements[0].value,
        formElements[2].value,
        formElements[1].value
      )
    ) {
      window.location.href = "/";
    }
  };

  return (
    <section id="register-page" className="m-5">
      <Form id="register-page-form">
        <h3>Register</h3>
        <Form.Label htmlFor="email">
          Email
          <Form.Control type="email" />
        </Form.Label>
        <Form.Label htmlFor="username">
          Username
          <Form.Control type="text" />
        </Form.Label>
        <Form.Label htmlFor="password">
          Password
          <Form.Control type="password" autoComplete="off" />
        </Form.Label>
        <Button
          type="submit"
          className="d-block m-auto"
          variant="dark"
          onClick={(e) => handleClick(e)}
        >
          Register
        </Button>
      </Form>
    </section>
  );
}
