/* Parameters
 *   USER = parameter is the user object
 *   for which a new user with be created
 *   with the values: firtst/last name
 *   email, password and mobile #
 */

async function match(io) {
  // io.on('connection', connect.matchUsers;
  // io.on('test', connect.test);

  io.on("connection", function(socket) {
    console.log("A user connected", socket);

    //NOTIFY CLIENT STATUS CONNECTED
    io.emit("load", {
      status: "CONNECTED"
    });

    socket.on("match", function(data) {
      // console.log(socket.client)

      const mainNamespace = io.of("/");
      console.log(mainNamespace.connected);
      var userToConnect = {
        id: "24394934839483493493"
      };

      console.log("fromClient: ", data);
      console.log("sendEndpointToClient: ", userToConnect);

      var z = 0;

      while (z < 10) {
        console.log("The number is " + z);
        z++;
      }

      io.emit("paired", userToConnect);
    });
  });
}

module.exports.match = match;

// io.on('connection', connect.matchUsers;
// io.on('test', connect.test);

// io.on('connection', function(socket){
//     console.log('A user connected', socket);

//     //NOTIFY CLIENT STATUS CONNECTED
//     io.emit('load', {
//         status: 'CONNECTED'
//     });

//     socket.on('match', function(data){

//         // console.log(socket.client)

//         const mainNamespace = io.of('/');
//         // console.log(mainNamespace.connected);
//         var userToConnect = {
//             id: '24394934839483493493'
//         };

//         console.log('fromClient: ', data);
//         console.log('sendEndpointToClient: ', userToConnect);

//         var z = 0;

//         while (z < 10) {

//             console.log("The number is " + z);
//             z++;
//         }

//         io.emit('paired', userToConnect);
//     });
// });
