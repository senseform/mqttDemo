const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'YOUR_HOST';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';
  //   var options = {
  //     host: '92bae866ae164ee984f794016fb7c7ba.s1.eu.hivemq.cloud',
  //     port: 8883,
  //     protocol: 'mqtts',
  //     username: 'adnan',
  //     password: ''
  // }
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    // this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
    this.mqttClient = mqtt.connect("mqtt://broker.mqttdashboard.com")
    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('lightOff', {qos: 0});
    this.mqttClient.subscribe('sensorData');
    this.mqttClient.publish('my/test/topic', JSON.stringify({'test1': {qos: 0}, 'test2': {qos: 1}}));
    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(topic,message.toString('utf8'));
    });
    

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic
  turnLightOn(data) {
    this.mqttClient.publish('light', JSON.stringify(data));
  }

  sendDataToSensor(data) {
    this.mqttClient.publish('sensor', JSON.stringify(data));
  }
  
}

module.exports = MqttHandler;
