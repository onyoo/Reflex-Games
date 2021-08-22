const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});

// let tables = {}
let tables = {
    1: { 
        log: [{card: 1, player: 13}, {card: 2, player: 1}],
        active_players: [1,13] 
    }
}


io.on("connection", (socket) => {
    console.log("got a connection!", socket.id)

    socket.join("room1")

    // basic emit
    socket.emit("normal emit!");
    // to all clients in the current namespace except the sender
    socket.broadcast.emit("Broadcast Emit!");
    // to all clients in room1 except the sender
    socket.to("room1").emit("testing room1");
    // to all clients in room1 and/or room2 except the sender
    socket.to("room1").to("room2").emit("testing123");
    // to all clients in room1
    io.in("room1").emit("testing123");
    // to all clients in namespace "myNamespace"
    io.of("myNamespace").emit("testing123");
    // to all clients in room1 in namespace "myNamespace"
    io.of("myNamespace").to("room1").emit("testing123");
    // to individual socketid (private message)
    io.to(socket.id).emit("testing123");
    // to all clients on this node (when using multiple nodes)
    io.local.emit("testing123");
    // to all connected clients
    io.emit("testing123");

    socket.on("TABLE_INFO", message => {
        if (message.id) {
            send(socket, tables[message.id])
        }else{
            send(socket, {error: "Table `id` needed."})
        }
    })

    socket.on("START_TABLE", message => {

    })

    socket.on("END_TABLE", message => {
        
    })

    socket.on("REQ_MOVE", message => {
        console.log(`got a move, message::`, message)
        if (!message.table_id) {
            send(socket,{error: "No `table_id` provided."})
        } else if (!message.move || (message.move && (!message.move.card || !message.move.player))) {
            send(socket,{error: "No `move` provided. Move request should include a move. Ex: {table_id: 1234, move: {player: 1, card: 43}}"})
        } else if (message.table_id in tables) {
            console.log("Correct move request!!")
            let update = {...tables[message.table_id], log: [...tables[message.table_id].log, message.move]}
            tables[message.id] = update
            send(socket,update)
        } else if (!(message.table_id in tables)) {
            send(socket,{error: "No game for move provided"})
        } else {
            send(socket,{error: `Unknown error. Please check sent message: `,message})
        }
    });
  });

  const send = (socket, obj) => {
    console.info("Responding: ", obj)
    socket.emit(obj)
  }

  
  httpServer.listen(8080);

