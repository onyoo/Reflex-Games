import { useState } from "react";

export const Icon = ({ image, names, ...props }) => {
  const [counter, setCounter] = useState(0);

  const sayHi = () => {
    alert("hi");
  };

  return (
    <div>
      <img height="30px" src={image} />
      {names.join(", ")}
      <br />
      <br />
      {counter}
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
};
