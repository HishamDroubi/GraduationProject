import { color } from '@mui/system';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { invitationAcceptance } from '../../features/auth/authSlice';
import { userAcceptInvitation } from '../../features/group/groupSlice';
import { backgroundColor } from '../../theme';
const Invitations = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const onInvitationAcceptance = async (invitationObject, acceptance) => {
        const invitationId = invitationObject._id;
        await dispatch(invitationAcceptance({ invitationId, acceptance }));
        if (acceptance) {
          const groupId = invitationObject.group._id;
          dispatch(userAcceptInvitation({ user, groupId }));
        }
      };
    console.log(user);
  return (
         
      <div className="table-responsive mt-3 mb-3 submissions-table">
        <table className="table table-striped text-center border small">
          <thead bg="primary" variant="dark" expand="lg">
            <tr>
              <th scope="col">#</th>
              <th scope="col">invitation</th>
            </tr>
          </thead>
          <tbody>
            {user.invitations.map((invitation) => (
              <tr key={invitation._id}>
                <th><strong>{invitation.group.name}</strong></th>
               <th>
            
             <Button
                  onClick={() =>
                    onInvitationAcceptance(
                        invitation,
                      true
                    )
                  }
                  style={{
                    marginLeft: 60,
                    backgroundColor: backgroundColor,
                    color: color,
                  }}
                >
                  Accept Invitation
                </Button>
                <Button
                  onClick={() =>
                    onInvitationAcceptance(
                        invitation,
                      false
                    )
                  }
                  style={{
                    marginLeft: 60,
                    backgroundColor: backgroundColor,
                    color: color,
                  }}
                >
                  Reject Invitation
                </Button>
            </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default Invitations