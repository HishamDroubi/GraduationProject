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
  let isImage = attachment.type + "";
  isImage = isImage.includes("image")
    console.log(attachment.type, isImage)
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
        
        
         {!isImage ? (<Col > <a
            href={`http://localhost:3004/uploads/${attachment.newName}`}
            download
            target="_blank"
            rel="noreferrer"
          >
            {attachment.originalname}
          </a></Col>) : (<Col className="w-100 h-4/5" ><img className="w-2/5 h-4/5"  src={`http://localhost:3004/uploads/${attachment.newName}`}/></Col>)}
        

        
      </Row>
    
  );
};

export default AttachmentItem;
