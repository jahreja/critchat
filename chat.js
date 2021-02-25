const socket = io();
const messageForm = document.getElementById("chat-box");
const messageInput = document.getElementById("chat-input");
const messageContainer = document.getElementById("message-container");
const likeButton = document.getElementById("like");
const heartButton = document.getElementById("heart");
const starButton = document.getElementById("star");
//const headerMessage = document.getElementById("header-message");

const name = prompt("Enter your name:");

appendMessage("You joined");
socket.emit("new-user", name);


socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`);
})
socket.on("react-message", data => {
    appendMessage(`${data.name} ${data.message}`);
})

socket.on("user-connected", name => {
    appendMessage(`${name} connected`);
})

socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", message);
    messageInput.value = "";
})
likeButton.addEventListener("click", e => {
    e.preventDefault();
    const message = "liked this!";
    appendMessage(`You ${message}`);
    socket.emit("send-react-message", message);
})
heartButton.addEventListener("click", e => {
    e.preventDefault();
    const message = "loved this!";
    appendMessage(`You ${message}`);
    socket.emit("send-react-message", message);
})
starButton.addEventListener("click", e => {
    e.preventDefault();
    const message = "starred this!";
    appendMessage(`You ${message}`);
    socket.emit("send-react-message", message);
})


function appendMessage(message){
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
