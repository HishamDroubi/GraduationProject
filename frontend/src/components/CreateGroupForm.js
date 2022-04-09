import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createGroup } from "../features/group/createGroupSlice";
import { reset } from "../features/group/createGroupSlice";
import Loader from "./Loader";
const CreateGroupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { group, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.createGroup
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate(`/group/${group._id}`);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess, navigate, message, group]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const GroupData = {
      name,
    };
    dispatch(createGroup(GroupData));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Form
      onSubmit={onSubmit}
      style={{
        marginBottom: "20px",
      }}
    >
      <Form.Group className="mb-3" controlId="GroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Group Name"
          name="name"
          onChange={onChange}
          value={name}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{
          width: "100%",
        }}
      >
        Create Group
      </Button>
    </Form>
  );
};

export default CreateGroupForm;
