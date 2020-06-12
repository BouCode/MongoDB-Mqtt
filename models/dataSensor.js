const mongoose = require ('mongoose');
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

module.exports = mongoose.model('Data', dataSchema);

