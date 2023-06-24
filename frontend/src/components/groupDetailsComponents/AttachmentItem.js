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
  let isImage = attachment.type !== "application/pdf" && attachment.type !==
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && attachment.type !== "text/plain" && attachment.type !==
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" && attachment.type !== "application/octet-stream" ;
  return (
    
      <Row>
        
          {attachment.type === "application/pdf" ? (
           <Col md="1"> <FontAwesomeIcon icon={faFilePdf} size="lg" /></Col>
          ) : attachment.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <Col md="1"><FontAwesomeIcon icon={faFileWord} size="lg" /></Col>
          ) : attachment.type === "text/plain" ? (
            <Col md="1"> <FontAwesomeIcon icon={faFileLines} size="lg" /></Col>
          ) : attachment.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
              <Col md="1"> <FontAwesomeIcon icon={faFilePowerpoint} size="lg" /></Col>
          ) : attachment.type === "application/octet-stream" ? (
            <Col md="1"> <FontAwesomeIcon icon={faFileZipper} size="lg" /></Col>
          ):(<></>)}
        
        <Col>
         {!isImage ? ( <a
            href={`http://localhost:3004/uploads/${attachment.newName}`}
            download
            target="_blank"
            rel="noreferrer"
          >
            {attachment.originalname}
          </a>) : (<img className="w-3/4 h-100" src={`http://localhost:3004/uploads/${attachment.newName}`}/>)}
        </Col>

        
      </Row>
    
  );
};

export default AttachmentItem;
