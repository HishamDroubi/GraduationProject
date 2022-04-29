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
import { Link, useParams, useNavigate } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useState } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import GroupCard from "../components/GroupCard";
import { backgroundColor, color } from "../theme";
const Groups = () => {
  const [basicModal, setBasicModal] = useState(false);
  const navigate = useNavigate();
  const toggleShow = () => setBasicModal((prevState) => !prevState);
  const { pageNumber = 1 } = useParams();
  const { groups, isLoading, isSuccess, isError, message, pages, page } =
    useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getGroups = async () => {
      await dispatch(fetchGroups(pageNumber));
    };
    getGroups();
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, pageNumber]);
  if (!groups || isLoading || !pages) {
    return <Loader />;
  } else if (pages && isSuccess) {
    if (pageNumber > pages) {
      navigate(`/groups/page/${pages}`);
    }
  }
  return (
    <>
      <>
        <Button
          onClick={toggleShow}
          style={{ backgroundColor: backgroundColor, color: color }}
        >
          Create Groupe
        </Button>
        <CreateGroupForm
          basicModal={basicModal}
          toggleShow={toggleShow}
          setBasicModal={setBasicModal}
        />
      </>
      {groups.map((group) => (
        <GroupCard group={group} key={group._id}/>
      ))}
      <Paginate pages={pages} page={page} />
    </>
  );
};

export default Groups;
