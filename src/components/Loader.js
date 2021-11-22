import React from "react";
import { RingLoader } from "react-spinners";

// different loader
// move into different folder (UI)

const Loader = () => {
  return (
    <div class="d-flex justify-content-center ">
      <RingLoader size={150} />
    </div>
  );
};
export default Loader;
