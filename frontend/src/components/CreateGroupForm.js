import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createGroup } from "../features/group/createGroupSlice";
import { reset } from "../features/group/createGroupSlice";
import Loader from "./Loader";
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
import { backgroundColor, color } from "../theme";
const CreateGroupForm = (props) => {

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal((prevState) => !prevState);
  
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
  const onSubmit = async (e) => {
    e.preventDefault();
    const GroupData = {
      name,
    };
    await dispatch(createGroup(GroupData));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Button
        onClick={toggleShow}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        Create Groupe
      </Button>
      <Form
        onSubmit={onSubmit}
        style={{
          marginBottom: "20px",
        }}
      >
        <MDBModal
          show={basicModal}
          setShow={setBasicModal}
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
                  onClick={toggleShow}
                ></Button>
              </MDBModalHeader>

              <MDBModalBody>
                <Form.Group className="mb-3" controlId="GroupName">
                  <Form.Label style={{ marginLeft: 8 }}>Name</Form.Label>
                  <Form.Control
                    style={{ width: 300, marginLeft: 8 }}
                    type="text"
                    placeholder="Group Name"
                    name="name"
                    onChange={onChange}
                    value={formData.name}
                  />
                </Form.Group>
              </MDBModalBody>

              <MDBModalFooter>
                <Button
                  type="button"
                  color="secondary"
                  onClick={toggleShow}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    width: 150,
                    marginLeft: 3,
                  }}
                >
                  Create Group
                </Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Form>
    </>
  );
};

export default CreateGroupForm;
