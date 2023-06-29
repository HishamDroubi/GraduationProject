import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserGroups, reset } from "../../features/profile/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import Paginate from "../Paginate";
import GroupCard from "../GroupCard";
import { Container } from "react-bootstrap";
const GroupsProfile = (props) => {
  const userName = props.userName;
  let { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message, userGroups, page, pages } =
    useSelector((state) => state.profile);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const fetchUserGroups = async () => {
      await dispatch(getUserGroups({ userName, pageNumber }));
      dispatch(reset());
    };
    fetchUserGroups();
  }, [dispatch, userName, message, isError, pageNumber]);
  if (isLoading) {
    return <Loader />;
  } else if (pages && isSuccess) {
    if (pageNumber > pages) {
      navigate(`/profile/${userName}/groups/page/${pages}`);
    }
  }
  return (
    <Container style={{ paddingTop: '20px' }}>
      {userGroups.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
      <Paginate
        pages={pages}
        page={page}
        isProfileGroup={true}
        userName={userName}
      />
    </Container>
  );
};

export default GroupsProfile;
