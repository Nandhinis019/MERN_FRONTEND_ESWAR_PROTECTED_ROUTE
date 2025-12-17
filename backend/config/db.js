const mongoose = require("mongoose");
const connectdb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Eswarback");
        console.log("Database Connected");   
    } catch (error) {
        console.error("mongodb connection err", error);
        process.exit(1);   
    }
};
module.exports = connectdb;
