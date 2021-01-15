import React from "react";
import spinner from "./Spinner.gif";

const Spinner = () => (
  <img src={spinner} alt="Loading..." style={spinnerStyle} />
);

const spinnerStyle = {
  width: "150px",
  display: "block",
  margin: "auto",
};

export default Spinner;
