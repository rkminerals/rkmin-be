const mongoose = require('mongoose');

let incomingEntry = mongoose.Schema({
    timeStamp:{ type: Date, default: Date.now()}, 
    incomingDate: { type: String},  
    mineralId: String,  
    mineralName: String,    
    supplier: String,  
    rockType: String,  
    typeQuantity: Number,
    truckNumber: String,
    remarks: { type: String, default: "No remarks"}
})

module.exports = IncomingEntry = mongoose.model('incomingEntry', incomingEntry);