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
    rePassword: "",
  });

  const { email, password, handle, phone, userName, rePassword } = formData;

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
    if (password !== rePassword) {
      toast.error("Password and Confirm password must be match");
      return;
    }
    const userData = {
      email,
      password,
      handle,
      phone,
      userName,
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            onChange={onChange}
            value={userName}
            required
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
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="handle">
          <Form.Label>Codeforces handle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Codeforces Handle"
            name="handle"
            onChange={onChange}
            value={handle}
            required
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
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rePassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="rePassword"
            onChange={onChange}
            value={rePassword}
            required
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
    </FormContainer>
  );
};

export default Register;
