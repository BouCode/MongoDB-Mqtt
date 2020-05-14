const mongoose = require ('mongoose');
const mqtt = require('mqtt');
require('dotenv').config();
const URI = process.env.DB_URL;
const client = mqtt.connect(process.env.URL_MQTT, {
  clientId: 'javascript'
});

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},
    (err) => {
    if (err) throw err;
    console.log ('Successfully connected')
})

client.on('connect', function () {
  console.log('client has connected!');

  client.subscribe('/hello');
});

const dataSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const sensorData = mongoose.model('Data', dataSchema);

client.on('message', function (topic, message) {
    const dataSensor = message.toString();
  const newData = new sensorData ({
    data: dataSensor
})
newData.save();
})
 

