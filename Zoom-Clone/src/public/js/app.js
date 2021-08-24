const messageUl = document.querySelector("ul");
const messageForm = document.querySelector("form");

// 프론트에서 백엔드로 연결하는 코드! window.location.host -> 현재 접속된 url, 백엔드로 메세지를 보낼 수 있음
// 서버로의 연결!
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New Message:", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
}

messageForm.addEventListener("submit", handleSubmit);
