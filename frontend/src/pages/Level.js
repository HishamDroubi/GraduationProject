import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getLevel, reset } from "../features/level/levelSlice";
import all from "../features/level/levelDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import CreateLevelForm from "../components/CreateLevelForm";
import LevelCard from "../components/LevelCard";
import { fetchLevel } from "../features/level/levelDetailsSlice";
const Level = () => {
  const [levelsDetails, setLevelsDetails] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch();
  const { levels, isLoading, isError, message } = useSelector(
    (state) => state.level
  );

  const { level } = useSelector((state) => state.levelDetails);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const featchLevelDetails = async () => {
      const LDS = [];
      await dispatch(getLevel());
      await dispatch(reset());
      console.log(levels)
      levels.forEach(async (LD) => {
        await dispatch(fetchLevel(LD._id));
        await dispatch(all.reset());
        console.log(level);
        LDS.push(level);
      });
      console.log(LDS)
      setLevelsDetails(LDS);
    };
    featchLevelDetails(); 
  }, [dispatch, isError, message, level, levels]);
  if (isLoading) {
    return <Loader />;
  }
  console.log(levels, " ", levelsDetails);
  return (
    <>
      <ListGroup>
        {levelsDetails.length > 1 &&
          levelsDetails.map((level) => (
            <LevelCard level={level} key={level._id} />
          ))}
      </ListGroup>
      {user && user.role === "admin" && (
        <>
          <Button onClick={toggleShow}>create level</Button>
          <CreateLevelForm
            basicModal={basicModal}
            toggleShow={toggleShow}
            setBasicModal={setBasicModal}
          />
        </>
      )}
    </>
  );
};

export default Level;
