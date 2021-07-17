// import logo from "./img/animal-icons-featured.svg";
import logo from "./img/animal-icons-featured.png";
import "./App.css";
import { Icon } from "./Components/Icon";
import { Card } from "./Components/Card";

const App = () => {
  const icons = [
    { id: "cow", logo: logo, names: ["ghost", "fantasma"] },
    { id: "cat", logo: logo, names: ["ghost2", "fantasma2"] },
    { id: "duck", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "giraffe", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "goat", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "unicorn", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "ram", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "oxen", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "cheetah", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "snake", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "hippo", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "wolf", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "water-buffalo", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "gazelle", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "hyena", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "bamboo", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "horse", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "badger", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "reindeer", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "donkey", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "pegasus", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "bison", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
    { id: "skip", logo: logo, names: ["ghost3", "fantasma3"] },
  ];

  return (
    <div className="App">
      <Card icons={icons} />
    </div>
  );
};

export default App;
