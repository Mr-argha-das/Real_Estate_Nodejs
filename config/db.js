const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL =
  "mongodb+srv://avbigbuddy:nZ4ATPTwJjzYnm20@cluster0.wplpkxz.mongodb.net/RealEstateDataBase3";
const database = () => {
  mongoose
    .connect(`${MONGO_URL}`)
    .then(() => {
      console.log("DataBase Connection Success!");
    })
    .catch((error) => console.log("Db Connection Error: " + error.message));
};
module.exports = database;
