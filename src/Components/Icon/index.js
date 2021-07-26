export const Icon = ({ image, names, style, id, ...props }) => {

  const checkForMatch = (ev,id) => {
    // let deckIcons = document.getElementById("deck").children[0].children
    // // const playerName = event.target.parentElement.parentElement.parentElement.id
    //
    // let target = ev.target
    // let playerName
    // console.log(players, cards, gameStarted)
    // debugger
    // while (!playerName) {
    //   target = target.parentElement
    //   console.log(players)
    //   if (players.some(player => player.name === target.id)) {
    //     playerName = target.id
    //   }
    // }
    const event = new CustomEvent('check-match', {detail: { user: "Roberto", id: "hippo" }});
    document.dispatchEvent(event)

  }

  return (
    <div
      className={id}
      style={{ position: "relative", display: "inline-block", padding: "1em" }}
    >
      <div
        style={{
          backgroundImage: `url(${"./img/animal-icons-featured-pub.png"})`,
          backgroundPosition: `right ${style.bottom} bottom ${style.right}`,
          backgroundSize: "400px",
          height: "60px",
          width: "60px",
          borderRadius: "3em",
        }}
        onClick={ev => checkForMatch(ev, id)}
      >
        {/*{id}*/}
      </div>
    </div>
  );
};
