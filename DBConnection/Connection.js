const mongoose = require('mongoose');

const ConnectionString = "mongodb+srv://rkminerals:rkminerals1234@cluster0.sdi9e.mongodb.net/rkmin?retryWrites=true&w=majority";


const connectDB = async () => {
    await mongoose.connect(ConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Database connection successful");
}

module.exports = connectDB;
