import { Button } from "react-bootstrap";
const Invitation = ({ invitation, onCancelInvitation }) => {
  return (
    <>
      <td>1</td>
      <td>{invitation.invitedUser.userName}</td>
      <td>
        <Button
          className="btn btn-outline-danger"
          onClick={() => onCancelInvitation(invitation._id)}
        >
          Cancel
        </Button>
      </td>
    </>
  );
};

export default Invitation;
