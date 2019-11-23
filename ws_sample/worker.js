const bc = new BroadcastChannel("WebSocketChannel");
const ws = new WebSocket("ws://localhost:8001");

ws.addEventListener("open", e => {
    console.log("Socket Opne");
});

// サーバーからデータを受け取る
ws.addEventListener("message", e => {
    console.log(`SharedWorkerでサーバーからデータ受信し、メインスクリプトへデータ送信 : 「${e.data}」`)
    // 開いている全ての複数ウィンドウ、複数タブへメッセージ送信
    bc.postMessage(e.data);
});

self.addEventListener("connect", e => {
    const port = e.ports[0];

    port.addEventListener("message", function (e) {
        console.log(`SharedWorkerでメインスクリプトからデータ受信し、サーバーへデータ送信 : 「${e.data}」`)
        ws.send(e.data);
    });

    port.start(); // addEventListenerを使用する場合に必要、onmessageを使う場合は暗黙的に呼び出される
})
