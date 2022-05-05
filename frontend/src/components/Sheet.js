import React from "react";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {
  faFilePdf,
  faFileWord,
  faFileLines,
  faFileImage,
  faFilePowerpoint,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import FormContainer from "./FormContainer";
import { deleteFile, uploadFile } from "../features/group/groupDetailsSlice";
import { toast } from "react-toastify";
const Sheet = ({ group, user }) => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
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
  const onDeleteAttachment = async (e) => {
    const attachmentId = e.target.value;
    await dispatch(deleteFile(attachmentId));
  };
  return (
    <>
      <div>
        {group.coach.email === user.email && (
          <FormContainer>
            <Form onSubmit={submitHandler} className="mt-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
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
        )}
      </div>
      <div>
        {group.attachments.map((attachment) => (
          <div key={attachment._id}>
            {attachment.type === "application/pdf" ? (
              <FontAwesomeIcon icon={faFilePdf} size="lg" />
            ) : attachment.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <FontAwesomeIcon icon={faFileWord} size="lg" />
            ) : attachment.type === "text/plain" ? (
              <FontAwesomeIcon icon={faFileLines} size="lg" />
            ) : attachment.type ===
              "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
              <FontAwesomeIcon icon={faFilePowerpoint} size="lg" />
            ) : attachment.type === "application/octet-stream" ? (
              <FontAwesomeIcon icon={faFileZipper} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faFileImage} size="lg" />
            )}
            <a
              href={`http://localhost:3004/uploads/${attachment.newName}`}
              download
              target="_blank"
              rel="noreferrer"
            >
              {attachment.originalname}
            </a>
            <Button
              variant="danger"
              value={attachment._id}
              onClick={onDeleteAttachment}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sheet;
