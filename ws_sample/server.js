const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

// httpサーバー作成
const server = http.createServer();
server.on("request", async (req, res) => {
  try {
      res.write(await fs.promises.readFile(`${__dirname}${req.url === "/" ? "/index.html" : req.url}`));
  } catch(e) {
      console.log(e.message)
      res.writeHead(404)
  }
  res.end();
});
server.listen(8000);
console.log("http server listening ...");

// websockerサーバー作成
const wss = new WebSocket.Server({ port: 8001 });
wss.on("connection", ws => {
  console.log("Socket connected successfully");

  ws.on("message", message => {
      console.log(`Received ${message}`);

      for (client of wss.clients) {
          client.send(`${message} from server!`);
          client.send(`現在のクライアントとの接続数 : ${[...wss.clients].length}`);
      }
  });

  ws.on("close", () => {
      console.log("I lost a client");
  });
});
