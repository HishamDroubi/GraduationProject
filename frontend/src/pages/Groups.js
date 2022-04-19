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
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useState } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import GroupCard from "../components/GroupCard";
const Groups = () => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal((prevState) => !prevState);
  const { pageNumber = 1 } = useParams();
  const { groups, isLoading, isError, message, pages, page } = useSelector(
    (state) => state.group
  );
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
  if (!groups || isLoading) {
    return <Loader />;
  }
  return (
    <>
      <>
        <Button onClick={toggleShow}>Create Groupe</Button>
        <CreateGroupForm
          basicModal={basicModal}
          toggleShow={toggleShow}
          setBasicModal={setBasicModal}
        />
      </>
      {groups.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
      <Paginate pages={pages} page={page} />
    </>
  );
};

export default Groups;
