const Koa = require('koa');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = new Koa();

const httpServer = createServer(app.callback());
const io = new Server(httpServer, { /* options */ });

// socket 链接
io.on("connection", (socket) => {
  console.log(socket.id)
  // 链接成功发送 returnId 事件
  socket.emit("returnId",socket.id );
});

// 中间件
app.use(async ctx => {
  ctx.body = 'koa run to port 3000';
});

app.listen(3000,()=>{
    console.log('服务已经在 http://localhost:3000 端口开启')
});