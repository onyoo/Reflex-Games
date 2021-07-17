import logo from "./logo.svg";
import "./App.css";
import { Icon } from "./Components/Icon";
import { Card } from "./Components/Card";

const App = () => {
  const icons = [
    { logo: logo, names: ["ghost", "fantasma"] },
    { logo: logo, names: ["ghost2", "fantasma2"] },
    { logo: logo, names: ["ghost3", "fantasma3"] },
  ];

  return (
    <div className="App">
      Hi
      <Card icons={icons} />
    </div>
  );
};

export default App;
