import { Card } from "../Card";
import { generateRandomIcons } from "../../App.js";
import { useState, useEffect } from "react";

export const Deck = ({icons, dealCard, ...props }) => {
  const deckCapacity = 51;
  const iconsPerCard = 6;

  const [cards, setCards] = useState([]);

  const initDeck = () => {
    addCardsToDeck(deckCapacity);
  };

  const addCardsToDeck = (numOfCards) => {
    let cards = [];
    for (var i = 0; i < numOfCards; i++) {
      cards.push(<Card icons={generateRandomIcons(iconsPerCard)}/>);
    }
    setCards(cards)
  };

  const dealNextCard = () => {
    let card = cards[0];
    setCards(cards.slice(1, cards.length))
    dealCard(card);
  };

  useEffect(() => {
    initDeck()
  }, []);

  return (
    <div>
      Deck Card Count: {cards.length}
      <button onClick={dealNextCard}>Deal Card</button>
    </div>
  );
};
