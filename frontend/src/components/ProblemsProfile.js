import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblemSolved, reset } from "../features/profile/profileSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Card } from "react-bootstrap";
import ProblemSubmission from "./ProblemSubmission";
import { toast } from "react-toastify";

const ProblemsProfile = (props) => {
  const userName = props.userName;
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message, problemSolved } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getUserProblem = async () => {
      await dispatch(getProblemSolved(userName));
      dispatch(reset());
    };
    getUserProblem();
  }, [dispatch, userName, message, isError]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (problemSolved &&
        <div className="table-responsive mt-3 mb-3 submissions-table">
          <table className="table table-striped text-center border small">
            <thead bg="primary" variant="dark" expand="lg">
              <tr>
              <th scope="col">Level</th>
                <th scope="col">Contest</th>
                <th scope="col">Index</th>
                <th scope="col">Problem</th>
                <th scope="col">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {problemSolved.map((p) => (
                <tr><ProblemSubmission userName={userName} key={p._id} problem={p} /></tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </>
  );
};

export default ProblemsProfile;
