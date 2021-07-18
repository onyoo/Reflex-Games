import { useState } from "react";
import { Icon } from "../Icon";
import logo from "../../img/animal-icons-featured.png";

export const Card = ({ icons, ...props }) => {
  return (
    <div style={{ border: "1px solid red" }}>
      {/* <img height="400px" src={logo} /> */}
      <br />
      {icons.map((icon, idx) => {
        return (
          <Icon
            image={icon.img}
            names={icon.names}
            id={icon.id}
            style={{
              position: "absolute",
              top: `${0 - icon.position.top}px`,
              left: 0,
              clip: `rect(${icon.position.top} ${icon.position.right} ${icon.position.bottom} ${icon.position.left})`,
            }}
          />
        );
      })}
    </div>
  );
};
