const http = require("http");
const fs = require("fs");

// httpサーバー作成
const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url === "/events") {

    res.writeHead(200, {
        "Content-Type": "text/event-stream", 
        "Cache-Control": "no-cache",
    });

    setInterval(() => {
        res.write(`data: ${JSON.stringify({ time: new Date().toLocaleTimeString() })}\n\n`)
        res.flushHeaders();
    }, 1000)

  } else {

    try {
        res.write(await fs.promises.readFile(`${__dirname}${req.url === "/" ? "/index.html" : req.url}`));
    } catch(e) {
        console.log(e.message)
        res.writeHead(404)
    }
    res.end();

  }
});
server.listen(8000);
console.log("http server listening ...");
