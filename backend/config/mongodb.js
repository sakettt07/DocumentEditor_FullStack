const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

const connectDB = async () => {
    try {
        const connectionIns = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected to ${connectionIns.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
