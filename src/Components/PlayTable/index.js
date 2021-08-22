import { useState, useEffect } from "react";
import { User } from "../User";
import { Card } from "../Card";
import { generateRandomIcons } from "../../App.js";
import { iconObjects } from "../../App.js";

export const PlayTable = ({ ...props }) => {
  const [tableStarted, setTableStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(null);
  const [winner, setWinner] = useState(null);
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);

  const PICK_UP = "pickUp";
  const DISCARD = "discard";

  const deckCapacity = 5;
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
    checkIfGameOver();
  }, [players]);

  useEffect(() => {
    checkIfGameOver();
  }, [cards]);

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
        player = dealCardFromDeckToPlayer(player, cardIdx);
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

  const resetTable = () => {
    setTableStarted(false);
    setGameStarted(null);
    setWinner(null);
    setPlayers([]);
    setCards([]);

    initDeck(deckCapacity);
  }

  const dealCardFromDeckToPlayer = (player, cardIdx) => {
    let card = cards[cardIdx];
    if (card) {
      return { name: player.name, cards: [card, ...player.cards] };
    }
    return player;
  };

  const removeCardFromPlayer = (player, cardIdx) => {
    let card = player.cards[cardIdx];
    if (card) {
      return { name: player.name, cards: player.cards.slice(1, player.cards.length)}
    }
    return player;
  }

  const checkForMatch = (playerName, iconId) => {
    if (players.length > 0) {
      let deckIcons = [...document.getElementById("deck").children[0].children];
      const isMatch = deckIcons.some((icon) => icon.className === iconId);

      if (isMatch) {
        console.log("It's a match! ", playerName, " => ", iconId);
        let player = players.find((player) => player.name === playerName);

        if (gameStarted === PICK_UP) {
          let newPlayer = dealCardFromDeckToPlayer(player, 0);
          updatePlayer(newPlayer);

          setCards(cards.slice(1, cards.length))

        } else if (gameStarted === DISCARD) {
          let newDeck = [player.cards[0], ...cards];
          setCards(newDeck);

          let updatedPlayer = removeCardFromPlayer(player, 0);
          updatePlayer(updatedPlayer);
        }
      } else {
        console.log("That is not a match. ", playerName, " => ", iconId);
      }
    }
  };

  const updatePlayer = (updatedPlayer) => {
    let matchedPlayer = players.find((existingPlayer) => existingPlayer.name === updatedPlayer.name);
    if (matchedPlayer) {
      console.log("Found matching player on playtable: ", matchedPlayer.name, ". Updating players.");
      let restOfPlayers = players.filter((existingPlayer) => existingPlayer.name !== matchedPlayer.name);
      setPlayers([updatedPlayer, ...restOfPlayers])
    } else {
      console.log("No matching player found for: ", updatedPlayer, ". No updates to make.");
    }
  }

  const checkIfGameOver = () => {
    if (!winner) {
      if (gameStarted == PICK_UP && cards.length == 0) {
        let roundWinner = players.reduce((leader, nextPlayer) => leader.cards.length > nextPlayer.cards.length ? leader : nextPlayer);
        setWinner(roundWinner.name);

      } else if (gameStarted == DISCARD) {
        let roundWinner = players.find((player) => player.cards.length == 0);
        if (roundWinner) {
          setWinner(roundWinner.name);
        }
      }
    }
  }

  return (
    <div>
      {winner && (
        <div>
          <br />
          <br />
          GAME OVER! {winner} won!
          <br />
          <br />
          <button onClick={resetTable}>Reset Table </button>
        </div>
      )}

      {!winner && tableStarted && gameStarted &&
        <div>{gameStarted}</div>
      }

      { cards.length > 0 && !winner && (
        <div>
        Deck Count: { cards.length }
          <div id="deck">{cards[0]}</div>
        </div>
      )}

      {tableStarted && (
        <div>
          {!winner &&
            <div>
              <br />
              Table started!!
              <br />
            </div>
          }
          <br />
          {players.map((player) => {
            return <User name={player.name} cards={player.cards} />;
          })}
          <br />
          <br />
        </div>
      )}

      {!winner && tableStarted && !gameStarted && (
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

      {!winner && !tableStarted && (
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
