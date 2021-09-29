let mineralSchema = { 
    mineralName: String, //unique
    measuringUnit: String, //Metric tonne
    // lumpTotalBalance: Number,
    //rockTypes: [{rockType: String, typeBalance: Number}],  //Lump, gitti, flakes, sand, powder
    rockTypesWithSupplier: [{rockType: String, supplier: String, typeBalance: Number}],  
    //Lump, gitti, flakes, sand, powder
    powderTotalBalance: Number,
    suppliers: [String],
    powderGrades: [{gradeName: String, gradeBalance: Number}],
}

let incomingEntrySchema = { 
    timeStamp: Date.now(), // the time at which the form/data is submitted
    incomingDate: Date, //the date when material arrived 
    mineralId: String,   
    //incomingQuantity: {supplier: String, rockType: String, typeQuantity: Number},  
    supplier: String, //dropdown is generated from mineralSchema.suppliers
    rockType: String, //dropdown is constructed from mineralSchema.rockTypes
    typeQuantity: Number,
    truckNumber: String,
    remarks: String
}

let GrindingEntrySchema = { 
    timeStamp: Date.now(), 
    grindingDate: Date,
    productionUnitUsed: String, // pulveriser 32 or pulveriser 42
    shift: String, //morning, evening, night
    mineralId: String,
    mineralName: String,
    grade: String, // user sees a list of grades in this mineral 
    quantityProduced: Number, //output
    composition: [{inputPartRatio: Number, supplier: String, rockType: String}], 
}

let powderDispatchingEntrySchema = { 
    mineralId: String,   
    mineralName: String,  // always powder
    gradeName: String,
    quantity: Number,
    remarks: String
}




 