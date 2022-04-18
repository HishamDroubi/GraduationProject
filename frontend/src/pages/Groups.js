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


import { useState } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import GroupCard from "../components/GroupCard";
import { backgroundColor, color } from "../theme";
const Groups = () => {

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

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
    <>

    {groups && (
    <>
    <Button style={{backgroundColor: backgroundColor, color: color}} onClick={toggleShow}>Create Groupe</Button>
      <CreateGroupForm basicModal={basicModal} toggleShow={toggleShow} setBasicModal={setBasicModal} /></>)}
      {groups &&
        groups.map((group) => (
          <GroupCard group={group} />
        ))}
    </>
  );
};

export default Groups;

