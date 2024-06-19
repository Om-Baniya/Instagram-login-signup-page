//8
const mongoose = require("mongoose");

const MONGO_URL = ""; // paste your database url

const databaseconnect = () => {
  mongoose
    .connect(MONGO_URL)
    .then((conn) => console.log(`connected to db :${conn.connection.host}`))
    .catch((err) => console.log(err.message));
};

module.exports = databaseconnect;