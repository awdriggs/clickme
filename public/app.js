const socket = io();

socket.on('newClient', (numClients) => {
  console.log('A user connected:', numClients);
  document.querySelector("#num-clients").innerHTML = numClients;
})

socket.on('health', (health) => {
  document.querySelector("#health").innerHTML = health;
  //change image based on health
  if(health <= 0){
    document.querySelector("#creature").src = "dead.webp";
  }
});

// Display incoming messages
socket.on('message', (data) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = data;
  document.getElementById('messages').appendChild(messageElement);
});

socket.on('death', () => {
  document.querySelector("#creature").src = "dead.webp";

  //remove event listener for clicks
})

// Send a message
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  socket.emit('message', message);
}

document.querySelector("#creature").addEventListener("click", () => {
  socket.emit("click", "Click!");
})



