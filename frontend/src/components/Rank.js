import React from "react";
import "../stylesheet/Rank.css";
const Rank = (props) => {
  const divStyle = {
    color: "#0000",
  };

  if (props.rank === "specialist") {
    divStyle.color = "#03a89e";
  } else if (props.rank === "master") {
    divStyle.color = "#ff8c00";
  } else if (props.rank === "expert") {
    divStyle.color = "blue";
  } else if (props.rank === "candidate master") {
    divStyle.color = "#a0a";
  } else if (props.rank === "international master") {
    divStyle.color = "#ff8c00";
  } else if (props.rank === "newbie") {
    divStyle.color = "gray";
  } else if (props.rank === "pupil") {
    divStyle.color = "green";
  } else {
    divStyle.color = "red";
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="userrank" style={divStyle}>
      <>
        {props.rate} {capitalizeFirstLetter(props.rank)}
      </>
    </div>
  );
};

export default Rank;
