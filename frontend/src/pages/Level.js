import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getLevel, reset } from "../features/level/levelSlice";
import all from "../features/level/levelDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import CreateLevelForm from "../components/levelCompopnents/CreateLevelForm";
import LevelCard from "../components/levelCompopnents/LevelCard";
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
      //const LDS = [];
      await dispatch(getLevel());
      await dispatch(reset());
      // console.log(levels);
      //console.log(LDS);
      //  setLevelsDetails(LDS);
    };
    featchLevelDetails();
  }, [dispatch, isError, message]);
  if (isLoading || !levels) {
    return <Loader />;
  }
  return (
    <>
      <div className="border-bottom position-relative my-3">
        <h3 className="position-absolute top-100 start-50 translate-middle bg-white px-4 text-muted mb-3">
          Levels
        </h3>
      </div>
      <ListGroup className="container mt-5">
        <div className="row">
          {levels &&
            levels.map((level) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={level._id}>
                <LevelCard level={level} key={level._id} />
              </div>
            ))}
        </div>
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
