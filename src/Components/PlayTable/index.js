import { useState, useEffect } from "react";
import { User } from "../User";
import { Card } from "../Card";
import { generateRandomIcons } from "../../App.js";
import { iconObjects } from "../../App.js";

export const PlayTable = ({ ...props }) => {
  const [tableStarted, setTableStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(null);
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);
  const deckCapacity = 51;
  const iconsPerCard = 6;

  useEffect(() => {
    initDeck(deckCapacity);
  }, []);

  useEffect(() => {
    console.log(players);
    if (players.length > 0) {
      checkForMatch("Kari", "lion");
    }
    document.addEventListener(
      "check-match",
      (e) => {
        console.log(players);
        checkForMatch(e.detail.user, e.detail.id);
      },
      false
    );
  }, [players]);

  const initDeck = (numOfCards) => {
    let cards = [];
    for (var i = 0; i < numOfCards; i++) {
      cards.push(<Card icons={generateRandomIcons(iconsPerCard)} />);
    }
    setCards(cards);
  };

  const addPlayers = () => {
    setPlayers([
      ...players,
      { name: "Roberto", cards: [] },
      { name: "Kari", cards: [] },
    ]);
  };

  const dealPlayerHands = (gameType) => {
    switch (gameType) {
      case "pickUp":
        dealCards(1);
        break;
      case "discard":
        dealCards();
        break;
      default:
        dealCards(1);
    }
  };

  const dealCards = (cardsPerPlayer = null) => {
    cardsPerPlayer =
      cardsPerPlayer !== null
        ? cardsPerPlayer
        : Math.floor((deckCapacity - 1) / players.length);

    let cardIdx = 0;
    let tempPlayers = [...players.map((player) => ({ ...player }))];
    for (var i = 0; i < cardsPerPlayer; i++) {
      tempPlayers = tempPlayers.map((player) => {
        player = dealCard(player, cardIdx);
        cardIdx += 1;
        return player;
      });
    }
    setPlayers(tempPlayers);
    setCards(cards.slice(cardIdx, cards.length));
  };

  const startGame = (gameType) => {
    setPlayers(
      players.map((player) => {
        return { ...player, cards: [] };
      })
    );
    setGameStarted(gameType);
    dealPlayerHands(gameType);
    console.log("startGame logs: ", players, cards, gameStarted);
  };

  const dealCard = (player, cardIdx) => {
    let card = cards[cardIdx];
    if (card) {
      return { name: player.name, cards: [...player.cards, card] };
    }
    return player;
  };

  const checkForMatch = (playerName, iconId) => {
    console.log("checkForMatch players:", players);
    debugger;

    let deckIcons = document.getElementById("deck").children[0].children;
    const isMatch = deckIcons.some((icon) => icon.className === iconId);
    if (isMatch) {
      let player = players.find((player) => player.name === playerName);

      if (startGame === "pickUp") {
        dealCard(player, 0);
      } else if (startGame === "discard") {
        let card = players[0].cards[0];
        // TODO - remove card from player's hand
        let tempPlayers = [...players];

        setCards([card, ...cards]);
      }
    }
  };

  return (
    <div>
      {tableStarted && gameStarted && <div>{gameStarted}</div>}
      <div id="deck">Deck: {cards[0]}</div>
      {tableStarted && (
        <div>
          Table started!!
          <br />
          Players:
          <br />
          {players.map((player) => {
            return <User name={player.name} cards={player.cards} />;
          })}
          <br />
          <br />
        </div>
      )}

      {tableStarted && !gameStarted && (
        <div>
          <button onClick={addPlayers}>Add Players</button>
          <button onClick={() => startGame("pickUp")}>
            Start Pick-Up Style Game
          </button>
          <button onClick={() => startGame("discard")}>
            Start Discard Style Game
          </button>
        </div>
      )}

      {!tableStarted && (
        <div>
          <br />
          <br />
          Let's Play The Reflex Game!
          <br />
          <br />
          <button onClick={() => setTableStarted(true)}>Start Table</button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};
