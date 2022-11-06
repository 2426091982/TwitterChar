// const ws = new WebSocket('ws://localhost:3000')


/**
 * @onopen 连接成功后的回调函数
 * @onclose 连接关闭后的回调函数
 * @onmessage 收到服务器数据后的回调函数
 * @send 向服务器发送数据
 */

/* ws.onopen = function () {
  ws.send('Hello Server!');
}

ws.onclose = function (event) {
  console.log('event', event)
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
}

ws.onmessage = function(event){
  console.log('event', event)
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}

ws.send('your message') */


var ws = new WebSocket("ws://localhost:3000");

ws.onopen = function (evt) {
  console.log("Connection open ...");
  ws.send("Hello WebSockets!");
};

ws.onmessage = function (evt) {
  console.log("Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function (evt) {
  console.log("Connection closed.");
};

export { ws }
