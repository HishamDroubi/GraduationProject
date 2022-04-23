import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblemSolved, reset } from "../features/profile/profileSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Card } from "react-bootstrap";
import ProblemSubmission from "./ProblemSubmission";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "./Paginate";
const ProblemsProfile = (props) => {
  const { pageNumber = 1 } = useParams();
  const userName = props.userName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message, problemSolved, page, pages } =
    useSelector((state) => state.profile);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getUserProblem = async () => {
      await dispatch(getProblemSolved({ userName, pageNumber }));
      dispatch(reset());
    };
    getUserProblem();
  }, [dispatch, userName, message, isError, pageNumber]);
  if (isLoading || !problemSolved || !pages) {
    return <Loader />;
  }
  else if (pages && isSuccess) {
    if (pageNumber > pages) {
      navigate(`/profile/${userName}/problems/page/${pages}`);
    }
  }
  return (
    <>
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
              <tr key={p._id}>
                <ProblemSubmission
                  userName={userName}
                  key={p._id}
                  problem={p}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginate pages={pages} page={page} isProblemProfile={true} />
    </>
  );
};
export default ProblemsProfile;
