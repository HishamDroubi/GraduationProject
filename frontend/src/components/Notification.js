
import React, { Component } from "react";
import { MDBContainer, MDBNotification } from "mdbreact";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
const Notification = () => 
{
    return (
      <MDBContainer className="grey darken-3 p-3">
        <MDBNotification
          iconClassName="text-primary"
          show
          fade
          title="Bootstrap"
          message="Hello, world! This is a toast message."
          text="11 mins ago"
        />
      </MDBContainer>
    );
  
}

export default Notification;