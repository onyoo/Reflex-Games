import sprite from "./img/animal-icons-featured.png";
import "./App.css";
import { Icon } from "./Components/Icon";
import { Card } from "./Components/Card";

let config = {
  row: {
    0: { right: "80px", left: "20px" },
    1: { right: "140px", left: "82px" },
    2: { right: "200px", left: "142px" },
    3: { right: "260px", left: "204px" },
    4: { right: "320px", left: "264px" },
    5: { right: "380px", left: "324px" },
  },
  column: {
    0: { top: "20px", bottom: "80px" },
    1: { top: "80px", bottom: "140px" },
    2: { top: "140px", bottom: "200px" },
    3: { top: "200px", bottom: "260px" },
    4: { top: "260px", bottom: "320px" },
    5: { top: "320px", bottom: "380px" },
  },
};

let confIcons = [
  "cow",
  "cat",
  "duck",
  "giraffe",
  "goat",
  "unicorn",
  "ram",
  "oxen",
  "cheetah",
  "snake",
  "skip",
  "hippo",
  "skip",
  "wolf",
  "water-buffalo",
  "gazelle",
  "hyena",
  "skip",
  "skip",
  "baboon",
  "skip",
  "stork",
  "skip",
  "horse",
  "badger",
  "skip",
  "bear",
  "fox",
  "pig",
  "reindeer",
  "donkey",
  "pegasus",
  "bison",
  "skip",
  "otter",
  "skip",
];

let iconObjects = confIcons.map((id, idx) => {
  return {
    id: id,
    img: sprite,
    position: { ...config.row[Math.floor(idx / 6)], ...config.column[idx % 6] },
  };
});

const App = () => {
  const generateRandomIcons = (n) => {
    let randomIcons = [];
    let randomIconMap = {};
    for (var i = 0; i < n; i++) {
      let randIcon =
        iconObjects[Math.floor(Math.random() * iconObjects.length)];
      if (!(randIcon.id in randomIconMap)) {
        randomIconMap[randIcon.id] = 1;
        randomIcons.push(randIcon);
      }
    }
    return randomIcons;
  };

  return (
    <div className="App">
      <Card icons={generateRandomIcons(9)} />
    </div>
  );
};

export default App;
