const mongoose = require('mongoose');

const ConnectionString = "mongodb+srv://mongodb:mongodb@cluster0.pfafq.mongodb.net/rkmin?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(ConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Database connection successful");
}

module.exports = connectDB;