import { useState } from "react";
import { Icon } from "../Icon";

export const Card = ({ icons, ...props }) => {
  return (
    <div>
      {icons.map((icon) => {
        return <Icon image={icon.logo} names={icon.names} />;
      })}
    </div>
  );
};
