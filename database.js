const mongoose = require ('mongoose');
require('dotenv').config();

const URI = process.env.DB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},
    (err) => {
    if (err) throw err;
    console.log ('Successfully connected')
})

module.exports = mongoose;