const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});

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


    // a message that might be dropped if the low-level transport is not writable
    socket.volatile.emit(/* ... */);

    socket.onAny((name, message) => {
        console.log(`got a message:: ${name}, message::`, message)
    });

    socket.on("REQ_MOVE", (message) => {
        console.log(`got a move, message::`, message)
        socket.emit({
              log: [
                {card: 1, player: 13},
                {card: 2, player: 1},
                {card: 3, player: 3},
                {card: 4, player: 5},
                {card: 5, player: 3},
                {card: 6, player: 8},
                {card: 7, player: 13},
                message
              ]
            })
    });
  });


  
  httpServer.listen(8080);

