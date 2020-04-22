const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt.cmmc.io") 
const WebSocket = require('ws');

let ws = new WebSocket("wss://xy.humanist.cc/stream/webrtc")
ws.onopen = () => console.log('on open')
ws.onclose = function(event) {
            console.log('socket closed with code: ' + event.code); 
}

ws.onmessage = function(evt) {
	let msg = JSON.parse(evt.data);
	let what = msg.what;
	console.log(msg)
}


var request = {
    what: "call",
    options: {
        force_hw_vcodec: false,
        vformat: 30, /* 30=640x480, 30 fps. 60=1280x720, 30 fps. */
        trickle_ice: true
    }
};

// let ws;
// let name = "nat";

// let createWebsocket = path => {
//     let _ws = new WebSocket(path);
//     _ws.onopen = () => {
//         console.log('_ws.onopen');
//     };

//     _ws.on('message', data => {
//         console.log(`_ws.message = `, data);
//         client.publish(`${name}/a`, data);
//     });


//     _ws.onclose = () => {
//         console.log('on close.')
//         _ws = createWebsocket(path);
//     }

//     _ws.onerror = () => {
//         console.log('on error.')
//     } 
//     return _ws;
// } 

// ws = createWebsocket('ws://localhost:8080/stream/webrtc')


// client.on("connect", () => {	
//     console.log("mqtt connected");
//     client.subscribe(`${name}/b`);
// })

// client.on("message", (topic, payload) => {
//     console.log(topic, payload.toString());
//     if (topic == `${name}/b`) {
//         ws.send(payload.toString()); 
//     }
// })