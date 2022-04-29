import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserGroups } from "../features/profile/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../features/profile/profileSlice";
import Loader from "./Loader";
import Paginate from "./Paginate";
import GroupCard from "./GroupCard";
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
  if (isLoading || !userGroups || !pages) {
    return <Loader />;
  } else if (pages && isSuccess) {
    if (pageNumber > pages) {
      navigate(`/profile/${userName}/groups/page/${pages}`);
    }
  }
  return (
    <>
      {userGroups.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
      <Paginate
        pages={pages}
        page={page}
        isProfileGroup={true}
        userName={userName}
      />
    </>
  );
};

export default GroupsProfile;
