import { useState, useEffect } from "react";
import { User } from "../User";
import { Card } from "../Card";
import { generateRandomIcons } from "../../App.js";
import { iconObjects } from "../../App.js";

export const PlayTable = ({ ...props }) => {
  const [tableStarted, setTableStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);
  const deckCapacity = 51;
  const iconsPerCard = 6;


  useEffect(() => {
    initDeck(deckCapacity)
  }, []);

  const initDeck = (numOfCards) => {
    let cards = [];
    for (var i = 0; i < numOfCards; i++) {
      cards.push(<Card icons={generateRandomIcons(iconsPerCard)}/>);
    }
    setCards(cards)
  };

  const addPlayers = () => {
    setPlayers([...players,
      { name: "Roberto", cards: [] },
      { name: "Kari", cards: [] }]
    );
  };

  const dealPlayerHands = (gameType) => {
    switch (gameType) {
      case "pickUp":
        dealCards(1)
        break;
      case "discard":
        dealCards()
        break;
      default:
        dealCards(1)
    }
  }

  const dealCards = (cardsPerPlayer = null) => {
    cardsPerPlayer = cardsPerPlayer !== null ? cardsPerPlayer :
      Math.floor((deckCapacity - 1) / players.length)

    let cardIdx = 0
    for (var i = 0; i < cardsPerPlayer; i++) {
      players.forEach(player => {
        dealCard(player, cardIdx)
        cardIdx += 1
      });
    }
    setCards(cards.slice(cardIdx, cards.length))
  }

  const startGame = (gameType) => {
    setPlayers(
      players.map((player) => {
        return { ...player, cards: [] };
      })
    );
    dealPlayerHands(gameType);
    setGameStarted(true);
  };

  const dealCard = (player,cardIdx) => {
    let card = cards[cardIdx];
    if (card) {
      setPlayers([
        { name: player.name,
          cards: player.cards.push(card)},
        ...players.filter(user => user.name !== player.name)
      ])
    }
  };

  return <div>
    {tableStarted && (<div>
      Table started!!
      <br/>
      Players: {
        players.map((player) => {
          return <User name={player.name} cards={player.cards}/>;
        })
      }
      <br/>
      <br/>
    </div>)}

    {tableStarted && !gameStarted && (<div>
      <button onClick={addPlayers}>Add Players</button>
      <button onClick={() => startGame("pickUp")}>Start Pick-Up Style Game</button>
      <button onClick={() => startGame("discard")}>Start Discard Style Game</button>
    </div>)}

    {!tableStarted && (
      <div>
        <br/>
        <br/>
        Let's Play The Reflex Game!
        <br/>
        <br/>
        <button onClick={() => setTableStarted(true)}>Start Table</button>
        <br/>
        <br/>
      </div>
    )}
    <div>
      {cards.map(card => card)}
    </div>
  </div>
};
