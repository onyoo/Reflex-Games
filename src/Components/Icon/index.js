import { useState } from "react";

export const Icon = ({ image, names, style, id, ...props }) => {
  console.log(style);
  return (
    <div
      id={id}
      style={{ position: "relative", display: "inline-block", padding: "1em" }}
    >
      <div
        style={{
          backgroundImage: `url(${"./img/animal-icons-featured-pub.png"})`,
          backgroundPosition: `right ${style.right} bottom ${style.top}`,
          backgroundSize: "400px",
          height: "60px",
          width: "60px",
          borderRadius: "3em",
        }}
      >
        {id}
      </div>
      {/* <img height="400px" src={image} style={{ ...style }} /> */}
      {/* {names.join(", ")} */}
      <br />
      <br />
    </div>
  );
};
