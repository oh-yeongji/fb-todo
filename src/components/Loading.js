import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  const styleObj = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 9999999999,
  };
  return (
    <div style={styleObj}>
      <ClipLoader size={150} />
    </div>
  );
};

export default Loading;
