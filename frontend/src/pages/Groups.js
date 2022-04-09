import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { reset } from "../features/group/groupSlice";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../features/group/groupSlice";
import Loader from "../components/Loader";
import CreateGroupForm from "../components/CreateGroupForm";
import { Link } from "react-router-dom";
const Groups = () => {
  const { groups, isLoading, isError, message } = useSelector(
    (state) => state.group
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [dispatch, isError, message]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <FormContainer>
      <CreateGroupForm />
      <ul>
        {groups &&
          groups.map((group) => (
            <li key={group._id}>
              <Link to={`/group/${group._id}`}>{group.name}</Link>
            </li>
          ))}
      </ul>
    </FormContainer>
  );
};

export default Groups;
