const mongoose = require('mongoose');

const grindingEntry = new mongoose.Schema({
    timeStamp: {type: Date, default: Date.now()}, 
    grindingDate: String,
    productionUnitUsed: String, // pulveriser 32 or pulveriser 42
    shift: String, //morning, evening, night
    mineralId: String,
    mineralName: String,
    gradeName: String, // user sees a list of grades in this mineral 
    quantityProduced: Number, //output
    composition: [{inputPartRatio: Number, supplier: String, rockType: String}],
});

module.exports = GrindingData = mongoose.model('grindingEntry', grindingEntry);

