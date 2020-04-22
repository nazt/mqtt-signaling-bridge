const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt.cmmc.io") 
const WebSocket = require('ws');

let ws;
let name = "nat";

let createWebsocket = path => {
    return _ws;
} 



client.on("connect", () => {	
    console.log("mqtt connected");
    client.subscribe(`${name}/b`);
})


client.on("message", (topic, payload) => {
    console.log(topic, payload.toString());
    let payloadObject = JSON.parse(payload.toString());
    if (topic == `${name}/b`) {
        if (payloadObject.what == "call") {
            if (ws) ws.close() 
            let _ws = new WebSocket('ws://localhost:8080/stream/webrtc'); 
            _ws.onopen = () => {
                console.log('_ws.onopen');
                ws.send(payload.toString()); 
            };

            _ws.on('message', data => {
                console.log(`_ws.message = `, data);
                client.publish(`${name}/a`, data);
            });


            _ws.onclose = () => {
                console.log('on close.')
            }

            _ws.onerror = () => {
                console.log('on error.')
            } 
            ws = _ws; 
        }
        else { 
             ws.send(payload.toString()); 
        } 
    }
})