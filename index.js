const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt.cmmc.io") 
const WebSocket = require('ws');

let ws;
let name = "nat";

let createWebsocket = path => {
    ws = new WebSocket(path);
    _ws.onopen = () => {
        console.log('_ws.onopen');
    };

    _ws.onmessage = data => {
        console.log(`_ws.message = `, data);
        client.publish(`${name}/a`, data);
    };


    _ws.onclose = () => {
        console.log('on close.')
        createWebsocket(path);
    }

    _ws.onerror = () => {
        console.log('on error.')
    } 
} 

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