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
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import GroupCard from "../components/GroupCard";
import { backgroundColor, color } from "../theme";
import CardEsaa from "../components/CardEsaa";
const Groups = () => {

  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { allGroups, groups, isLoading, isSuccess, isError, message, pages, page } =
    useSelector((state) => state.group);
    
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getGroups = async () => {
      await dispatch(fetchGroups(pageNumber));
    };
    getGroups();
    console.log(groups)
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
    
      <Row>
        <Col>
        <CreateGroupForm   />
        <div>
          <CardEsaa groups={allGroups} />
          </div>
        </Col>
        
        <Col md="8">
          {groups.map((group) => (
            <GroupCard group={group} key={group._id} />
          ))} 
          <Paginate pages={pages} page={page} />
        </Col>
      </Row>

     
    </>
  );
};

export default Groups;
