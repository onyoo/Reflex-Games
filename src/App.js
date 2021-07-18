import sprite from "./img/animal-icons-featured.png";
import "./App.css";
import { Icon } from "./Components/Icon";
import { Card } from "./Components/Card";
import { User } from "./Components/User";

let config = {
  row: {
    0: { right: 80, left: 20 },
    1: { right: 140, left: 82 },
    2: { right: 200, left: 142 },
    3: { right: 260, left: 204 },
    4: { right: 320, left: 264 },
    5: { right: 380, left: 324 },
  },
  column: {
    0: { top: 20, bottom: 80 },
    1: { top: 80, bottom: 140 },
    2: { top: 140, bottom: 200 },
    3: { top: 200, bottom: 260 },
    4: { top: 260, bottom: 320 },
    5: { top: 320, bottom: 380 },
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
  const getUnique = (randomIconMap) => {
    let icon = iconObjects[Math.floor(Math.random() * iconObjects.length)];
    while (icon.id in randomIconMap) {
      icon = iconObjects[Math.floor(Math.random() * iconObjects.length)];
    }
    return icon;
  };

  const generateRandomIcons = (n) => {
    let randomIcons = [];
    let randomIconMap = {};
    for (var i = 0; i < n; i++) {
      let randIcon = getUnique(randomIconMap);
      randomIconMap[randIcon.id] = 1;
      randomIcons.push(randIcon);
    }
    console.log(randomIcons.map((o) => o.id));
    return randomIcons;
  };

  let card1 = <Card icons={generateRandomIcons(9)} />;
  let card2 = <Card icons={generateRandomIcons(4)} />;

  return (
    <div className="App">
      {/* <Card icons={generateRandomIcons(9)} /> */}
      <User name="Roberto" cards={[card1]} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <User name="Kari" cards={[card2]} />
    </div>
  );
};

export default App;
