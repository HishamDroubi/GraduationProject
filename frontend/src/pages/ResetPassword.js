import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import NewPasswordForm from "../components/resetPasswordComponent/NewPasswordForm";
import EmailForm from "../components/resetPasswordComponent/EmailForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const ResetPassword = () => {
  const { token } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <FormContainer>
      {token ? <NewPasswordForm token={token} /> : <EmailForm />}
    </FormContainer>
  );
};

export default ResetPassword;
