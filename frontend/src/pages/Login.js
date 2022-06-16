import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import Loader from "../components/Loader";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    // Form container Edit - props.md -
    <FormContainer md='6'>
      <Form onSubmit={onSubmit} className="p-2 rounded shadow">
        <Form.Group
          className="m-5 mb-4 text-secondary fw-bold"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow-sm"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={email}
          />
        </Form.Group>

        <Form.Group
          className="mx-5 text-secondary fw-bold"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="shadow-sm"
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={password}
          />
        </Form.Group>
        <p
          className="mx-5 p-2 text-primary"
          type="button"
          onClick={() => navigate("/reset-password")}
          style={{
            textDecoration: "underLine",
          }}
        >
          Forget Password ?
        </p>
        <Button
          variant="primary"
          type="submit"
          className="d-grid col-6 mx-auto my-4 border-0"
        >
          Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
