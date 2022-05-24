import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblemSolved, reset } from "../../features/profile/profileSlice";
import Loader from "../Loader";
import Message from "../Message";
import { Card } from "react-bootstrap";
import ProblemSubmission from "../ProblemSubmission";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../Paginate";
import Participant from "./Participant";
const Participants = (props) => {
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
            {props.participants.map((p, index) => (
              <tr key={p._id}>
                <Participant index={index} key={p._id} participant={p} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Participants;
