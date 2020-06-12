const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

require ('./database.js');

app.use(cors());
app.use(express.json());

const client = require ('./mqtt/index.js');

app.get('/', (req, res) => {
    res.sendFile (__dirname + '/index.html')
  })
  
const sensorData = require ('./models/dataSensor')
client.on('message', function (topic, message) {
    const dataSensor = message.toString();
    const newData = new sensorData ({
      data: dataSensor
    })
  // newData.save();
  console.log(newData);
  console.log(newData.date);

  io.emit('data', dataSensor);
  io.emit('time', newData.date);
}) 

const server = app.listen(PORT, () => {
  console.log (`http://localhost:${PORT}`)
})

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on ('connection', (socket) => {
socket.on ('button', (data) => {
  console.log (data);
  if (data === "Encendido"){
    client.publish ('switch', data);
  }
  if (data === "Apagado") {
    client.publish ('switch', data);
  }
})
})
