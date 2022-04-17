import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getLevel, reset } from "../features/level/levelSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import CreateLevelForm from "../components/CreateLevelForm";
const Level = () => {

  const { user } = useSelector((state) => state.auth);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch();
  const { level, isLoading, isError, message } = useSelector(
    (state) => state.level
  );
  useEffect(() => {
    dispatch(getLevel());
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ListGroup>
        {level &&
          level.map((level) => (
            <LinkContainer to={`/level/${level._id}`} key={level._id}>
              <ListGroup.Item >
                {level.topic}
              </ListGroup.Item>
            </LinkContainer>
          ))}
      </ListGroup>
      {user && user.role === 'admin' && (
        <>
          <Button onClick={toggleShow}>create level</Button>
          <CreateLevelForm basicModal={basicModal} toggleShow={toggleShow} setBasicModal={setBasicModal} />
        </>
      )}

    </>
  );
};

export default Level;
