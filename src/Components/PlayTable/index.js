import { useState } from "react";
import { User } from "../User";
import { Deck } from "../Deck";
import { iconObjects } from "../../App.js";

export const PlayTable = ({ ...props }) => {
  const [tableStarted, setTableStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState(null);

  const addPlayers = () => {
    setPlayers([...players,
      { name: "Roberto", cards: [] },
      { name: "Kari", cards: [] }]
    );
  };

  const startGame = (gameType) => {
    setDeck(
      <Deck icons={iconObjects} dealCard={dealCard}/>
    );
    setPlayers(
      players.map((player) => {
        return { ...player, cards: [] };
      })
    );
  };

  const dealCard = (card) => {
    let recipient = players[0];
    setPlayers([].concat(
      [{ name: recipient.name, cards: recipient.cards.push(card) }],
      players.slice(1, players.length)
    ))
  };

  return tableStarted ? (
    <div>
      Table started!!
      <br/>
      Players: {
        players.map((player) => {
          return <User name={player.name} cards={player.cards}/>;
        })
      }
      <br/>
      deck: { deck }
      <br/>
      <button onClick={addPlayers}>Add Players</button>
      <button onClick={() => startGame("pickUp")}>Start Pick-Up Style Game</button>
      <button onClick={() => startGame("discard")}>Start Discard Style Game</button>
    </div>
  ) : (
    <div>
      <br/>
      <br/>
      Let's Play The Reflex Game!
      <br/>
      <br/>
      <button onClick={() => setTableStarted(true)}>Start Table</button>
    </div>
  );
};
