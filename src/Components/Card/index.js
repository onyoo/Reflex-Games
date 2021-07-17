import { useState } from "react";
import { Icon } from "../Icon";
import logo from "../../img/animal-icons-featured.png";

export const Card = ({ icons, ...props }) => {
  return (
    <div>
      <img height="400px" src={logo} />
      <br />
      {icons.map((icon) => {
        return (
          <Icon
            image={icon.img}
            names={icon.names}
            id={icon.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              clip: `rect(${icon.position.top} ${icon.position.right} ${icon.position.bottom} ${icon.position.left})`,
            }}
          />
        );
      })}
    </div>
  );
};
