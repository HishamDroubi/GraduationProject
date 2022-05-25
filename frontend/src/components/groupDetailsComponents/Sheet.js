import React from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CreateAttachmentForm from "./CreateAttachmentForm";
import { useDispatch } from "react-redux";
import { deleteFile, uploadFile } from "../../features/group/groupDetailsSlice";
import { toast } from "react-toastify";
import AttachmentItem from "./AttachmentItem";

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
      {group.coach.email === user.email && <CreateAttachmentForm />}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            {group.attachments.map((attachment) => (
              <AttachmentItem
                key={attachment._id}
                attachment={attachment}
                onDeleteAttachment={onDeleteAttachment}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Sheet;
