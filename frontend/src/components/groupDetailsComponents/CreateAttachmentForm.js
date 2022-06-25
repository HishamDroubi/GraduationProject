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
import { createBlog, uploadFile } from "../../features/group/groupDetailsSlice";
const CreateAttachmentForm = (props) => {
  const [attachments, setAttachments] = useState([]);
  const [texts, setTexts] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal((prevState) => !prevState);

  const { id } = useParams();
  const [file, setFile] = useState(null);

  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const dispatch = useDispatch();
  const submitFileHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please choose file");
      return;
    }
    const formData = new FormData();
    formData.append("attach", file);
    const { payload } = await dispatch(uploadFile({ formData, groupId: id }));
    attachments.push({attachment: payload._id, order: 1});
    setAttachments(attachments);
    console.log(attachments);
    setFile(null);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      groupId: id,
      attachments: attachments,
      texts: texts,
      heading: heading
    };
    await dispatch(createBlog(data));
  };
  const submitTextHandler = async (e) => {
    e.preventDefault();
    if (text === "") {
      toast.error("Please enter any thing");
      return;
    }

    texts.push({content: text, order: 1});
    setTexts(texts);
    console.log(texts);
    setText("");
  };

  return (
    <>
      <Button onClick={toggleShow}>Add Attachment</Button>
      <Form
        onSubmit={onSubmitHandler}
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
                    type="text"
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Heading"
                  />
               </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>

                <Button
                  onClick={submitFileHandler}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </Form.Group>
                <Button
                  onClick={submitTextHandler}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </MDBModalBody>

              <MDBModalFooter>
                <Button type="button" color="secondary" onClick={toggleShow}>
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
    </>
  );
};

export default CreateAttachmentForm;
