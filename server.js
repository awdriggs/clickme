// Import required modules
import express from "express";
import http from "http";
import { Server } from "socket.io";

// Create an Express app
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Create an HTTP server and integrate it with Socket.io
const server = http.createServer(app);
const io = new Server(server);

let delay = 1000;
let creature = {};
let asteroid = {show: false, clicks: 0};
let numClients = 0;

//anna drove this section
// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  numClients++;

  io.emit("newClient", numClients);

  //if you are the first client, init the creature
  if (numClients == 1) {
    creature.health = 100;
    creature.alive = true;
    creature.decayRate = 1;
    console.log(creature);
    //initiate the timer
    //set the interval function, adam drove here
    let countDown = setInterval(() => {
      creature.health -= creature.decayRate;
      
      if(asteroid.show) {
        creature.health -= 10;
      }
      
      io.emit("health", creature.health);
      
      //
      
      //is health < 0?
      if (creature.health <= 0) {
        
        creature.alive = false;
        console.log("Creature is dead");
        //io.emit("test", creature.health);
        //io.emit("death", creature.health); // this is not working
        // console.log("emitting death");

        //stop the interval
        clearInterval(countDown);
        console.log("countdown stopped");
      }
    }, delay);
    //adam stopped driving
  } else if (numClients > 5){
    asteroid.show = true;
    asteroid.clicks = 0;
    // asteriod.x = 100;
    // asteriod.y = 100;
    io.emit("asteroid");
    
    //emit asteriod?
  } else {
    //creature.decayRate++; //each person makes it go down more quickly?
  }

  //send the first health update to a new user for display
  io.emit("health", creature.health);

  // Listen for a custom event from the client
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  //listen for a click
  socket.on("click", (data) => {
    //console.log('Message received:', data);

    if (creature.health < 100 && creature.alive) {
      creature.health++;
    }
    // Broadcast the message to all connected clients
    io.emit("health", creature.health);
  });

  socket.on("asteroidClick", (data) => {
    console.log("asteroid clicked");
    asteroid.clicks++;

    if(asteroid.clicks >= numClients){
      asteroid.show = false;
      io.emit("destroyAsteroid");
    }
    // io.emit("asteroidClick");
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    numClients--;

    //check to see if the asteroid should disappear
    if (numClients <= 2) {
      creature.decayRate = 1;
    }

    io.emit("newClient", numClients);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("server serving");

