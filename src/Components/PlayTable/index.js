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
  const PICK_UP = "pickUp";
  const DISCARD = "discard";
  const deckCapacity = 51;
  const iconsPerCard = 6;

  useEffect(() => {
    initDeck(deckCapacity);
  }, []);

  useEffect(() => {
    document.addEventListener(
      "check-match",
      (e) => {
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
      case PICK_UP:
        dealCards(1);
        break;
      case DISCARD:
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
      return { name: player.name, cards: [card, ...player.cards] };
    }
    return player;
  };

  const checkForMatch = (playerName, iconId) => {
    if (players.length > 0) {
      let deckIcons = [...document.getElementById("deck").children[0].children];
      const isMatch = deckIcons.some((icon) => icon.className === iconId);

      if (isMatch) {
        console.log("It's a match! ", playerName, " => ", iconId);
        let player = players.find((player) => player.name === playerName);

        if (gameStarted === PICK_UP) {
          console.log("[PickUp Play Mode] Adding top deck card to ", player.name, "'s hand");

          let newPlayer = dealCard(player, 0);
          updatePlayer(newPlayer);

          setCards(cards.slice(1, cards.length))

        } else if (gameStarted === DISCARD) {
          console.log("[Discard Play Mode] To Be Implemented...");
        }
      } else {
        console.log("That is not a match. ", playerName, " => ", iconId);
      }
    }
  };

  const updatePlayer = (updatedPlayer) => {
    console.log("Searching for ", updatedPlayer, " on playtable. Current players: ", players);
    let matchedPlayer = players.find((existingPlayer) => existingPlayer.name === updatedPlayer.name);

    if (matchedPlayer) {
      console.log("Found matching player on playtable: ", matchedPlayer.name, ". Updating players.");
      let restOfPlayers = players.filter((existingPlayer) => existingPlayer.name !== matchedPlayer.name);
      setPlayers([updatedPlayer, ...restOfPlayers])
    } else {
      console.log("No matching player found for: ", updatedPlayer, ". No updates to make.");
    }
  }

  return (
    <div>
      {tableStarted && gameStarted && <div>{gameStarted}</div>}
      Deck Count: { cards.length }
      <div id="deck">{cards[0]}</div>
      {tableStarted && (
        <div>
          <br />
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
