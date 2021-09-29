const mongoose = require('mongoose');

const powderDispatchingEntry = mongoose.Schema({
    dispatchingDate: String,
    mineralId: String,   
    mineralName: String,
    gradeName: String,
    quantityDispatched: Number,
    remarks: String
})

module.exports = PowderDispatchingEntry = mongoose.model('powderDispatchingEntry', powderDispatchingEntry);