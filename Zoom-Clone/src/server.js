import WebSocket from "ws";
import http from "http";
import express from "express";

const app = express();

// 화면 엔진을 pug로 설정
app.set("view engine", "pug");
// view 경로 설정
app.set("views", __dirname + "/views");
// 사용자가 /public/경로.../파일의 주소로 접근시 사용자에게 해당 파일에 접근할 수 있도록 static 설정!
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from Browser");
}

const sockets = [];

// socket = 연결된 브라우저와의 연결 통로! 햐당 socket을 통해서 프론트로 메세지를 보낼 수 있음!
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf-8")));
  });
});

server.listen(3000, handleListen);
