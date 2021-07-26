import { useState, useEffect } from "react";
import { Card } from "../Card";

export const User = ({name, cards, ...props }) => {
  const [visibleCard, setVisibleCard] = useState(null);

  useEffect(() => {
    if (cards.length > 0) {
      setVisibleCard(cards[0])
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      setVisibleCard(cards[0])
    }
  }, [cards]);

  return (
    <div id={name} style={ {display: "inline-block", margin: "50px"}}>
      {name}
      <br/>
      Card Count: {cards.length}
      <br/>
      {visibleCard}
    </div>
  );
};
