const mongoose = require("mongoose");
require("dotenv").config();

const db_password = process.env.MONGODB_PASSWORD;
const connectDB = async () => {
  return await mongoose.connect(
    `mongodb+srv://prajeetshahlac:${db_password}@cluster0.fm3ayhs.mongodb.net/smartpedagogy?retryWrites=true&w=majority&appName=Cluster0`
  );
};

module.exports = connectDB;
