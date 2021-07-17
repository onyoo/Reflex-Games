import { useState } from "react";

export const Icon = ({ image, names, ...props }) => {
  return (
    <div>
      <img
        height="90px"
        src={image}
        style={{ clip: "rect(0, 10px, 20px, 0)" }}
      />
      {/* {names.join(", ")} */}
      <br />
      <br />
    </div>
  );
};
