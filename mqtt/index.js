const mqtt = require('mqtt');

require('dotenv').config();
const client = mqtt.connect(process.env.URL_MQTT, {
  clientId: 'javascript'
});

client.on('connect', function () {
    console.log('client has connected!');
  
    client.subscribe('/hello');
  });

module.exports = client;