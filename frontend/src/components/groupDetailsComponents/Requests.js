import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import Participant from "./Participant";
import { NavLink } from "react-router-dom";
import {
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import Request from "./Request";
import { InviteUsers } from "../../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
const Requests = ({ groupId, requestAcceptance, requests }) => {
  return (
    <>
      <div className="table-responsive mt-3 mb-3 submissions-table">
        <table className="table table-striped text-center border small">
          <thead bg="primary" variant="dark" expand="lg">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <Request requestAcceptance={requestAcceptance} request={r} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Requests;
