import { useState } from "react";
import { Card } from "../Card";

export const User = ({name, cards, ...props }) => {
  const userCards = cards;
  const visibleCard = userCards[0]

  return (
    <div>
      {name}
      {visibleCard}
    </div>
  );
};
