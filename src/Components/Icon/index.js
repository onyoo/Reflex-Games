import { useState } from "react";

export const Icon = ({ image, names, style, id, ...props }) => {
  return (
    <div
      id={id}
      style={{ position: "relative", display: "inline-block", padding: "1em" }}
    >
      <img height="400px" src={image} style={{ ...style }} />
      {/* {names.join(", ")} */}
      <br />
      <br />
    </div>
  );
};
