const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt.cmmc.io")

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081/stream/webrtc');

ws.onopen = open() => {
    console.log('ws.onopen');
};

ws.onmessage = data => {
    console.log(`ws.message = `, data);
    client.publish('nat/a', data);
};


ws.onclose = () => {
    console.log('on close.')
}

ws.onerror = () => {
    console.log('on error.')
}


client.on("connect", () => {	
    console.log("connected");
    client.subscribe("nat/b");
})

client.on("message", (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic == "nat/b") {
        ws.send(payload.toString()); 
    }
})