import React from "react";
import { useEffect } from "react";
import { getGroupDetails, reset } from "../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const GroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { group, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.groupDetails
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/groups");
    }
    const fetchGroup = async () => {
      await dispatch(getGroupDetails(id));
      dispatch(reset());
    };
    fetchGroup();
  }, [dispatch, isError, message, id, navigate]);
  if (isLoading) {
    return <Loader />;
  }
  return <div>GroupDetails</div>;
};

export default GroupDetails;
