import React from "react";
import {
  faFileImage,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "react-bootstrap";

const AttachmentItem = (props) => {
  const { attachment, onDeleteAttachment } = props;
  return (
    <Card key={attachment._id}>
      <Row>
        <Col md="1">
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
        </Col>
        <Col md="6">
          <a
            href={`http://localhost:3004/uploads/${attachment.newName}`}
            download
            target="_blank"
            rel="noreferrer"
          >
            {attachment.originalname}
          </a>
        </Col>

        
      </Row>
    </Card>
  );
};

export default AttachmentItem;
