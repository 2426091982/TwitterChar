const http = require("http");
const Koa = require("koa");
const WebSocket = require("ws");
const app = new Koa();

const server = http.createServer(app.callback());
const wss = new WebSocket.Server({
  // 同一个端口监听不同的服务
  server,
});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // console.log("received: %s", message);
    console.log(message.toString())
    ws.send(message.toString());
  });
});
server.listen(3000, () => {
  console.log(3000);
});
