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
      toast.error("Password and Confirm password must match");
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
    // FormContainer Edit - props.md -
    <FormContainer md='12' className="container">
      <Form onSubmit={onSubmit} className="row shadow rounded bg-white p-5" style={{width: '100%'}}>
        <Form.Group className="col-lg-6 col-sm-12 mb-3" controlId="userName">
        <Form.Label className="text-muted fw-bold">Username</Form.Label>
        <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            onChange={onChange}
            value={userName}
            required
        />
        </Form.Group>
        <Form.Group className="col-lg-6 col-sm-12 mb-3" controlId="Email">
          <Form.Label className="text-muted fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={onChange}
            value={email}
            required
          />
        </Form.Group>

        <Form.Group className="col-lg-6 col-sm-12 mb-3" controlId="handle">
          <Form.Label className="text-muted fw-bold">Codeforces handle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Codeforces Handle"
            name="handle"
            onChange={onChange}
            value={handle}
            required
          />
        </Form.Group>

        <a className="col-lg-6 col-sm-12 align-self-end pb-3 text-primary" href="https://codeforces.com/">Go to codeforces.com</a>

        <Form.Group className="col-lg-6 col-sm-12 mb-3" controlId="Password">
          <Form.Label className="text-muted fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={password}
            required
          />
        </Form.Group>

        <Form.Group className="col-lg-6 col-sm-12 mb-3" controlId="rePassword">
          <Form.Label className="text-muted fw-bold">Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="rePassword"
            onChange={onChange}
            value={rePassword}
            required
          />
        </Form.Group>

        
        <div className="col-12 mt-4">
            <Button
            variant="primary"
            type="submit"
            className="px-5"
            >
            Register
            </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Register;
