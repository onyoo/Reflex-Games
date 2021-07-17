import logo from "./logo.svg";
import "./App.css";
import { Icon } from "./Components/Icon";

const App = () => {
  return (
    <div className="App">
      Hi
      <Icon image={logo} names={["ghost", "fantasma"]} />
    </div>
  );
};

export default App;
