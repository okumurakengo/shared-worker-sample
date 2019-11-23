const bc = new BroadcastChannel("WebSocketChannel");
const es = new EventSource("./events");

es.addEventListener("message", e => {
    const { time } = JSON.parse(e.data);
    bc.postMessage(`${time} from SharedWorker!`);
});
