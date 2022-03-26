import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import Loader from "../components/Loader";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    handle: "",
    phone: "",
    userName: "",
  });

  

  const { email, password, handle, phone, userName } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      handle,
      phone,
      userName
    };
    dispatch(register(userData));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="userName"
            onChange={onChange}
            value={userName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="handle">
          <Form.Label>Codeforces Handle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Codeforces Handle"
            name="handle"
            onChange={onChange}
            value={handle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            name="phone"
            onChange={onChange}
            value={phone}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
