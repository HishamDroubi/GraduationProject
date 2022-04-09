import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchLevel, reset } from "../features/level/levelDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import AddProblemForm from "../components/AddProblemForm";
import { useNavigate } from "react-router-dom";
const LevelDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { level, isLoading, isError, message } = useSelector(
    (state) => state.levelDetails
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      toast.error("login first");
      navigate("/login");
    }
    dispatch(fetchLevel(id));
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, id, navigate, user]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {level && level.problems && level.solvedProblems && (
        <FormContainer>
          {user && user.role === "admin" && <AddProblemForm />}
          <h3 style={{ textAlign: "center" }}>{level.topic}</h3>
          <Table
            hover
            responsive
            style={{ textAlign: "center", border: "1px solid black" }}
          >
            <thead
              style={{
                backgroundColor: "#e9eae5",
              }}
            >
              <tr>
                <th className="col-3">ID</th>
                <th className="col-6">Name</th>
                <th className="col-3">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {level.problems.map((problem, index) => (
                <tr
                  key={problem._id}
                  style={{
                    backgroundColor:
                      level.solvedProblems.find((p) => p._id === problem._id) &&
                      "#90ee90",
                  }}
                >
                  <td>
                    {problem.contest}
                    {problem.index}
                  </td>
                  <td>
                    <a
                      href={problem.url}
                      key={problem._id}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      {problem.name}
                    </a>
                  </td>
                  <td>{problem.rating}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormContainer>
      )}
    </>
  );
};

export default LevelDetails;
