import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Participant from './Participant'
import { NavLink } from 'react-router-dom';
import Request from './Request'
const Requests = (props) => {
  console.log(props.requests);
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
            {props.requests.map((r) => (

              <tr>
                <Request requestAcceptance={props.requestAcceptance} request={r} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Requests;