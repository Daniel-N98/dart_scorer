import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { auth } from "../../firebase/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const inputs = document.getElementById("forgot-password-form");
    const email = inputs[0];
    const triggerEmailPasswordReset = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value);
        setEmail({ email: email.value, valid: true });
      } catch (error) {
        setEmail({ email: email.value, valid: false });
      }
    };
    triggerEmailPasswordReset();
  };
  return (
    <section>
      {email ? (
        <p style={{ color: email.valid ? "green" : "red" }}>
          {email.valid
            ? `Password reset email sent to ${email.email}`
            : `No user found with the email ${email.email}`}
        </p>
      ) : (
        ""
      )}
      <Form id="forgot-password-form">
        <Form.Label htmlFor="email">
          Enter your email
          <Form.Control id="email" type="email" autoComplete="on" />
        </Form.Label>
        <Button
          type="submit"
          variant="dark"
          className="d-block m-auto"
          onClick={(e) => handleClick(e)}
        >
          Reset password
        </Button>
      </Form>
    </section>
  );
}
