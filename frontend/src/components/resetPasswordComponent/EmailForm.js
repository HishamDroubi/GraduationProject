import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
const EmailForm = () => {
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/auth/reset-password", { email })
      .then(({ data }) => {
        toast.success(data);
      })
      .catch(() => {
        toast.error("Email not found");
      });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{
          width: "100%",
        }}
      >
        Submit
      </Button>
    </Form>
  );
};
export default EmailForm;
