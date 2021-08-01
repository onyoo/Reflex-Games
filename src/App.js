import sprite from "./img/animal-icons-featured.png";
import "./App.css";
import { PlayTable } from "./Components/PlayTable";
import { RCTConnection, findLocalIp } from "./Services/RCTService";

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
  "skip1",
  "hippo",
  "skip2",
  "wolf",
  "water-buffalo",
  "gazelle",
  "hyena",
  "skip3",
  "skip4",
  "baboon",
  "skip5",
  "stork",
  "skip6",
  "horse",
  "badger",
  "skip7",
  "bear",
  "fox",
  "pig",
  "reindeer",
  "donkey",
  "pegasus",
  "bison",
  "skip8",
  "otter",
  "skip9",
];

export let iconObjects = confIcons.map((id, idx) => {
  return {
    id: id,
    img: sprite,
    position: { ...config.row[Math.floor(idx / 6)], ...config.column[idx % 6] },
  };
});

export const generateRandomIcons = (n) => {
  let randomIcons = [];

  for (var i = 0; i < n && i < iconObjects.length; i++) {
    let usedIds = randomIcons.map((icon) => icon.id);
    let randIcon = getUnique(usedIds);
    randomIcons.push(randIcon);
  }
  return randomIcons;
};

export const getUnique = (usedIds) => {
  let filteredIcons = iconObjects.filter(
    (icon) => usedIds.indexOf(icon.id) === -1
  );
  let icon;
  while (!icon && filteredIcons.length > 0) {
    let idx = Math.floor(Math.random() * filteredIcons.length);
    icon = filteredIcons[idx];
  }
  return icon;
};

const App = () => {
  // let conn = new RCTConnection();
  // conn.connect();
  // findLocalIp();

  return (
    <div className="App">
      <PlayTable />
    </div>
  );
};

export default App;
