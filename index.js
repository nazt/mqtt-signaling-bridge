#!/usr/bin/env node

const mqtt = require('mqtt');
const WebSocket = require('ws');

const { program } = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-c, --config <file>', 'add the specified config file');
 
program.parse(process.argv);

 


if (!program.config) {
    if (program.debug) console.log(program.opts());
    console.log('no config file');
    process.exit(-1) 
}


const CONFIG = require(program.config); 
CONFIG.FILE = program.config

if (program.debug) {
    console.log("Config File");
    console.log(CONFIG);
    console.log("------------");
}

const client = mqtt.connect(CONFIG.MQTT_HOST); 

// let LOCAL_SIGNALING_SERVER = 'ws://localhost:8080/stream/webrtc'
let LOCAL_SIGNALING_SERVER = 'ws://xy.humanist.cc/stream/webrtc'

let ws;
let name = CONFIG.DEVICE_NAME;

let createWebSocket = payload => {
    let _ws = new WebSocket(LOCAL_SIGNALING_SERVER); 
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

    return _ws;
}

client.on("connect", () => {	
    // if (program.debug) { }
    console.log('MQTT CONNECTED')
    console.log("DEVICE_NAME", name);
    client.subscribe(`${name}/b`);
})

client.on("message", async (topic, payload) => {
    let payloadObject = JSON.parse(payload.toString());
    if (topic == `${name}/b`) {
        console.log(payloadObject)
        if (payloadObject.what == "call") {
            if (ws) ws.close() 
            ws = createWebSocket(payload); 
        }
        else { 
             ws.send(payload.toString()); 
        } 
    }
})