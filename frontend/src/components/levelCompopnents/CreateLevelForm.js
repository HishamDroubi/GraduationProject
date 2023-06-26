import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../../features/level/levelFormSlice";
import Loader from "../Loader";
import { create } from "../../features/level/levelFormSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
const CreateLevelForm = (props) => {
  const [formData, setFormData] = useState({
    number: "",
    topic: "",
    description: "",
  });

  const { number, topic, description } = formData;
  const { user } = useSelector((state) => state.auth);
  const { level, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.levelForm
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    if (isSuccess) {
      navigate(`/level/${level._id}`);
    }
    return () => {
      dispatch(reset());
    };
  }, [level, isError, isSuccess, message, navigate, dispatch, user]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const levelData = {
      number,
      topic,
      description,
    };
    dispatch(create(levelData));
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <MDBModal
          show={props.basicModal}
          setShow={props.setBasicModal}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Create groupe</MDBModalTitle>
                <Button
                  type="button"
                  className="btn-close"
                  color="none"
                  onClick={props.toggleShow}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Number"
                    name="number"
                    onChange={onChange}
                    value={number}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="topic">
                  <Form.Label>topic</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Topic"
                    name="topic"
                    onChange={onChange}
                    value={topic}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={onChange}
                    value={description}
                  />
                </Form.Group>
              </MDBModalBody>
              <MDBModalFooter>
                <Button
                  type="button"
                  color="secondary"
                  onClick={props.toggleShow}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Form>
    </FormContainer>
  );
};

export default CreateLevelForm;
