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
import ButtonSubmit from "../Utils/ButtonSubmit";
const CreateAttachmentForm = (props) => {

  let order = 1;
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
    attachments.push({ attachment: payload._id, order: attachments.length + texts.length });
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
    setText('')
    setFile(null)
    toggleShow()

  };
  const submitTextHandler = async (e) => {
    e.preventDefault();
    if (text === "") {
      toast.error("Please enter any thing");
      return;
    }

    texts.push({ content: text, order: attachments.length + texts.length });
    setTexts(texts);
    console.log(texts);
    setText("");

  };

  return (
    <>
      <button onClick={toggleShow}>Create Blog</button>

      <Form
        onSubmit={onSubmitHandler}
        style={{
          marginBottom: "20px",
        }}
      >
        <MDBModal className="" show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Create Blog</MDBModalTitle>
              </MDBModalHeader>

              <div className="flix p-2">

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Heading"
                  />
                </Form.Group>
                <hr />
                <div className="flex flex justify-around ">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                  <ButtonSubmit

                    onClickHandler={submitFileHandler}

                  />


                </div>


                <hr />
                <div className="flex relative">

                  <div className="w-3/4">
                    <Form.Control

                      as="textarea"
                      rows={20}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Content"
                    />

                  </div>


                  <div className="absolute bottom-0 right-0">
                    <ButtonSubmit

                    onClickHandler={submitTextHandler}

                  /></div>
                </div>
              </div>

              <MDBModalFooter>
                <Button type="button" color="secondary" onClick={toggleShow}>
                  Close
                </Button>
                <ButtonSubmit />
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Form>
    </>
  );
};

export default CreateAttachmentForm;
