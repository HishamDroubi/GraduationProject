import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { fetchLevel, reset } from "../features/level/levelDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import AddProblemForm from "../components/levelCompopnents/AddProblemForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/Utils/SideBar";
import HelperLevelDetails from "../components/levelCompopnents/HelperLevelDetails";
const LevelDetails = () => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { level, isLoading, isError, message } = useSelector(
    (state) => state.levelDetails
  );

 
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {

    const getLevel = async () => {
      await dispatch(fetchLevel(id));
      dispatch(reset());
    };
    getLevel();
  }, [dispatch, isError, message, id, navigate]);
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <>
     {level && level.problems && level.solvedProblems && (<HelperLevelDetails level={level}/>)}
    </>
  );
};

export default LevelDetails;
