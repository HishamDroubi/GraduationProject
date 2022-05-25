import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createGroup } from "../../features/group/createGroupSlice";
import { reset } from "../../features/group/createGroupSlice";
import Loader from "../Loader";
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
import { backgroundColor, color } from "../../theme";
import { uploadFile } from "../../features/group/groupDetailsSlice";
const CreateAttachmentForm = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal((prevState) => !prevState);

  const { id } = useParams();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please choose file");
      return;
    }
    const formData = new FormData();
    formData.append("attach", file);
    await dispatch(uploadFile({ formData, groupId: id }));
    setFile(null);
  };
  return (
    <>
      <Button
        onClick={toggleShow}
      >
        Add Attachment
      </Button>
      <Form
        onSubmit={submitHandler}
        style={{
          marginBottom: "20px",
        }}
      >
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Create groupe</MDBModalTitle>
                
              </MDBModalHeader>

              <MDBModalBody>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </MDBModalBody>

              <MDBModalFooter>
                <Button type="button" color="secondary" onClick={toggleShow}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  
                >
                  Submit
                </Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Form>
    </>
  );
};

export default CreateAttachmentForm;
