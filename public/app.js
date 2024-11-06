const socket = io();

socket.on("newClient", (numClients) => {
  console.log("A user connected:", numClients);
  document.querySelector("#num-clients").innerHTML = numClients;
});

socket.on("health", (health) => {
  document.querySelector("#health").innerHTML = health;
  //change image based on health
  if (health <= 0) {
    document.querySelector("#creature").src = "dead.png";
  } else if (health <= 20) {
    document.querySelector("#creature").src = "dying.gif";
  } else {
    document.querySelector("#creature").src = "alive.gif";
  }
});

// Display incoming messages
socket.on("message", (data) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = data;
  document.getElementById("messages").appendChild(messageElement);
});

socket.on("asteroid", ()=> {
  console.log("oh shit!")
  //show the asteroid
  let asteroid = document.createElement("img");
  asteroid.src = "asteroid.gif";

  asteroid.id = "asteroid";

  asteroid.addEventListener("click", () => {
    socket.emit("asteroidClick", "Click!");
  });

  document.querySelector("body").append(asteroid);
  
});

socket.on("destroyAsteroid", ()=> {
  console.log("destroy the roid")
  document.querySelector("#asteroid").remove();
});

// socket.on("death", () => {
//   document.querySelector("#creature").src = "dead.png";

//   //remove event listener for clicks
// });

// Send a message
function sendMessage() {
  const message = document.getElementById("messageInput").value;
  socket.emit("message", message);
}

document.querySelector("#creature").addEventListener("click", () => {
  socket.emit("click", "Click!");
});

document.querySelector("#close").addEventListener("click", () =>{
  document.querySelector("#directions").style.display = "none";
})
