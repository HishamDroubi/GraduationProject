import React from "react";
import { Button } from "react-bootstrap";
import { MDBInput, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import {
  InviteUsersSearch,
  inviteUser,
  cancelInvitation,
} from "../../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Invitation from "./Invitation";
import Loader from "../Loader";
const Invitations = ({ groupId }) => {
  const dispatch = useDispatch();
  const { searchedUsers, invitations } = useSelector(
    (state) => state.groupDetails
  );
  const [showSearchedUserList, setShowSearchedUserList] = useState(false);
  const getUsers = async (keyword) => {
    if (keyword.length > 2) {
      setShowSearchedUserList(true);
      await dispatch(InviteUsersSearch({ keyword, groupId }));
    } else {
      setShowSearchedUserList(false);
    }
  };
  const onInviteUser = async (userId) => {
    await dispatch(inviteUser({ userId, groupId }));
  };
  const onCancelInvitation = async (invitationId) => {
    await dispatch(cancelInvitation(invitationId));
  };
  if (!invitations) {
    return <Loader />;
  }
  return (
    <>
      <div className="table-responsive mt-3 mb-3 submissions-table">
        <MDBInput
          type="text"
          placeholder="Invite users"
          onChange={(e) => getUsers(e.target.value)}
          style={{
            border: "1px solid black",
          }}
        />
        {
          <MDBListGroup>
            {searchedUsers &&
              searchedUsers.map((user) => (
                <MDBListGroupItem
                  key={user._id}
                  type="button"
                  style={{
                    display: !showSearchedUserList && "none",
                  }}
                >
                  {user.userName}
                  <Button onClick={() => onInviteUser(user._id)}>Invite</Button>
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
        }

        <table className="table table-striped text-center border small">
          <thead bg="primary" variant="dark" expand="lg">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          {
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation._id}>
                  <Invitation
                    invitation={invitation}
                    onCancelInvitation={onCancelInvitation}
                  />
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  );
};

export default Invitations;
