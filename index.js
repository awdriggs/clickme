// Import required modules
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Create an Express app
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create an HTTP server and integrate it with Socket.io
const server = http.createServer(app);
const io = new Server(server);

let delay = 3000;
let creature = {}
let numClients = 0;

//adam drove

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  numClients++;
  io.emit('newClient', numClients);

  //if you are the first client, init the creature
  if (numClients == 1) {
    creature.health = 5;
    creature.alive = true;
    console.log(creature);
    //initiate the timer
    //set the interval function, adam drove here
    let countDown = setInterval(() => {
      creature.health--;
      io.emit('health', creature.health);
      //is health < 0?
      if (creature.health <= 0){
        creature.alive = false;
        console.log("Creature is dead");
        io.emit("death"); //no args needed?
        
        //stop the interval
        clearInterval(countDown);
        console.log("countdown stopped")
      }
    }, delay);
    //adam stopped driving
  }

  //send the first health update to a new user for display
  io.emit('health', creature.health);

  // Listen for a custom event from the client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('click', (data) => {
    //console.log('Message received:', data);

    if (creature.health < 100 && creature.alive){
      creature.health++;
    }
    // Broadcast the message to all connected clients
    io.emit('health', creature.health);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    numClients--;
    io.emit('newClient', numClients);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
