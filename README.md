# mqtt-signaling-bridge

## Preparation

    curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
  
add this line to /etc/apt/sources.list

    deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main
  
  
## UV4L Installation
```
  sudo apt update
  sudo apt upgrade
  sudo apt-get install uv4l uv4l-raspicam uv4l-server uv4l-webrtc uv4l-raspicam-extras
```

```
 sudo apt-get install uv4l-webrtc-armv6
```

## Start

    uv4l-mqtt-bridge --config=$HOME/mqtt-signaling-bridge/config.js
    pm2 start "uv4l-mqtt-bridge --config=$HOME/mqtt-signaling-bridge/config.js" --name bridge
    
## Configurations

```
module.exports = {
  "DEVICE_NAME": "nat",
  "MQTT_HOST": "mqtt://mqtt.cmmc.io"
}
// mqtt://user:pass@localhost:1883?clientId=clientId
```
