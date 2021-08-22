'use strict';
import { io } from "socket.io-client";

var os = require('os');
// var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');


const URL = "192.168.0.21:8080";
// const URL = "localhost:8080";
const socket = io(URL, { autoConnect: true });

setTimeout(() => {
  console.log("sending....")
  socket.emit("REQ_MOVE", {card: 8, player: 13}, (answer) => {
    console.log("got reply to move::", answer)

  })

}, 1000)




// let reply = {
//   log: [
//     {card: 1, player: 13},
//     {card: 2, player: 1},
//     {card: 3, player: 3},
//     {card: 4, player: 5},
//     {card: 5, player: 3},
//     {card: 6, player: 8},
//     {card: 7, player: 13}
//   ]
// }