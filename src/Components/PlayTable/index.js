import { useState } from "react";

export const PlayTable = ({ ...props }) => {
  const [gameStarted, setGameStarted] = useState(false);

  return gameStarted ? (
    <div>
      game started!!
      <button onClick={setGameStarted(false)}>End Game</button>
    </div>
  ) : (
    <div>
      Game not started :(
      <button onClick={setGameStarted(true)}>Start Game</button>
    </div>
  );
};
