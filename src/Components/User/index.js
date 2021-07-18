import { useState, useEffect } from "react";
import { Card } from "../Card";

export const User = ({name, cards, ...props }) => {
  const [userCards, setUserCards] = useState(cards);
  const [visibleCard, setVisibleCard] = useState(null);

  useEffect(() => {
    if (cards.length > 0) {
      setVisibleCard(cards[0])
    }
  }, []);

  return (
    <div>
      {name}
      <br/>
      Card Count: {userCards.length}
      <br/>
      {visibleCard}
    </div>
  );
};
