const bc = new BroadcastChannel("WebSocketChannel");
const worker = new SharedWorker("worker.js")
worker.port.start();

bc.addEventListener("message", e => {
    sample.appendChild(document.createElement("li")).textContent = e.data;
});
