import { useState } from "react";

export const PlayTable = ({ ...props }) => {
  const [tableStarted, setTableStarted] = useState(false);
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    setPlayers([...players, { name: "Roberto", cards: [] }]);
    setPlayers([...players, { name: "Kari", cards: [] }]);
  };

  const startGame = () => {
    setPlayers(
      players.map((player) => {
        return { ...player, cards: [] };
      })
    );
  };

  return gameStarted ? (
    <div>
      table started!!
      {players.map((player) => {
        <User name={player.name} />;
      })}
      <button onClick={startGame}>Start Game</button>
      <button onClick={addPlayer}>Add Player</button>
    </div>
  ) : (
    <div>
      Game not started :(
      <button onClick={setTableStarted(true)}>Start Table</button>
    </div>
  );
};
