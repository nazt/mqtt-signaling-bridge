const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt.cmmc.io") 
const WebSocket = require('ws');

let ws;
let name = "nat";

let createWebsocket = path => {
    let _ws = new WebSocket(path);
    _ws.onopen = () => {
        console.log('_ws.onopen');
    };

    _ws.onmessage = data => {
        console.log(`_ws.message = `, data);
        client.publish(`${name}/a`, data);
    };


    _ws.onclose = () => {
        console.log('on close.')
        ws = createWebsocket(path);
    }

    _ws.onerror = () => {
        console.log('on error.')
    } 
    return _ws;
} 

ws = createWebsocket('ws://localhost:8080/stream/webrtc')


client.on("connect", () => {	
    console.log("mqtt connected");
    client.subscribe(`${name}/b`);
})

client.on("message", (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic == `${name}t/b`) {
        ws.send(payload.toString()); 
    }
})