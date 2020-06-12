const { Router } = require ('express');
const router = Router ();

const sensorData = require ('../models/dataSensor.js');

router.get('/api/data', async (req, res) => {
    const data = await sensorData.find();
    res.json (data)
  });
  