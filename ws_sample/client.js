const bc = new BroadcastChannel("WebSocketChannel");
const worker = new SharedWorker("worker.js")
worker.port.start();

button.addEventListener("click", e => {
  console.log(`メインスクリプトからSharedWorkerにデータ送信 「${text.value}」`)
  worker.port.postMessage(text.value)
});

bc.addEventListener("message", e => {
  console.log(`メインスクリプトでSharedWorkerからのデータ受信 「${e.data}」`)
});
