import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const NewPasswordForm = ({ token }) => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/auth/reset-password/${token}`).catch(() => {
        toast.error("Something went wrong");
        navigate("/login");
      });
    };
    fetchUser();
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (rePassword !== password) {
      toast.error("Password and Confirm password must match");
      return;
    }
    axios
      .post(`/auth/reset-password/${token}`, {
        password,
      })
      .then(({ data }) => {
        toast.success(data);
        navigate("/login");
      })
      .catch(() => {
        toast.error("Something went wrong please try later");
        navigate("/login");
      });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="rePassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="rePassword"
          onChange={(e) => setRePassword(e.target.value)}
          value={rePassword}
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

export default NewPasswordForm;
