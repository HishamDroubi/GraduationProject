import React from "react";
import CreateBlogForm from "../groupDetailsComponents/Blogs/CreateBlogForm";
import { useSelector } from "react-redux";
import AddPoblemForm from "../levelCompopnents/AddProblemForm";
import { RadioGroup } from "@mui/material";
import RadioGroupContext from "@mui/material/RadioGroup/RadioGroupContext";
import CirculerProgressBar from "./CirculerProgressBar/CirculerProgressBar";
import { MdArrowForward } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Timer from "./Timer";
const SideBar = ({ group, level, onFilterHandler }) => {
  const { user } = useSelector((state) => state.auth);
  let percentage = level
    ? level.solvedProblems.length !== 0
      ? level.solvedProblems.length / level.problems.length
      : 0
    : 0;
  percentage *= 100;
  return (
    <div className="border p-3 h-screen mr-10 w-1/6 flex flex-col">
      {/* group side bar */}

      {group && group.coach.email === user.email && (
        <button className="w-full">
          <CreateBlogForm />
        </button>
      )}

      {group && (
        <>
          <div className="border h-96 w-full rounded pt-2 px-2">
            <span className="flex justify-center"> Fliter </span>
            <hr />
          </div>

          <div className="flex-col border rounded w-full h-52 mt-3 p-3">
            <div className="flex">
              <div className="mt-1">
                <MdArrowForward />
              </div>
              <div className="ml-1">Pay attention</div>
            </div>
            <hr/>
            <div className="w-full text-center mb-2">Befor Metting</div>
            
            <Timer />

            <hr/>
            <div className="w-full text-center"><button className="hover:text-blue-600">go to the metting</button></div>

          </div>
        </>
      )}

      {/* level side bar */}

      {level && user.role === "admin" && (
        <button className="w-full">
          <AddPoblemForm />
        </button>
      )}

      {level && (
        <div className="border h-96 w-full rounded pt-2 px-2">
          <span className="flex p-2">Topic: {level.topic} </span>
          <hr />
          <div className="flex flex-col">
            <div>
              <input
                onChange={() => onFilterHandler("1")}
                className="bg-gray-300 m-3"
                id="choice1"
                name="filter"
                type="radio"
              />
              <label className="text-sm" for="choice1">
                <span>Problems,</span>{" "}
                <span className="ml-3 text-sm">
                  {level.problems.length} problems
                </span>
              </label>
            </div>

            <div>
              <input
                onChange={() => onFilterHandler("2")}
                className="bg-gray-300 m-3"
                id="choice2"
                name="filter"
                type="radio"
              />
              <label for="choice2">
                <span>Solved problems,</span>{" "}
                <span className="ml-3 text-sm">
                  {level.solvedProblems.length} problems
                </span>
              </label>
            </div>

            <div>
              <input
                onChange={() => onFilterHandler("3")}
                className="bg-gray-300 m-3"
                id="choice3"
                name="filter"
                type="radio"
              />
              <label for="choice3 ">
                <span>Unolved problems,</span>{" "}
                <span className="ml-3 text-sm">
                  {level.problems.length - level.solvedProblems.length} problems
                </span>
              </label>
            </div>
            <hr />

            <div className="flex p-2">
              <div className="mr-6">Status: </div>
              <CirculerProgressBar percentage={percentage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
