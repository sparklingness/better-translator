import React from "react";
import ReactLoading from "react-loading";

const Spinner = ({ type, color, height, width }) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);

export default Spinner;
