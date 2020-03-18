async function matchUsers(socket) {
  console.log("A user connected:", socket.id);
  console.log(socket);
  io.emit("test", "word");
}

async function test(socket) {
  console.log("A user connected to tEST:", socket.id);
  console.log(socket);
}

module.exports.matchUsers = matchUsers;
module.exports.test = test;
