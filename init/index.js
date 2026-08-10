//for development purpose only
//run this file to initialize the database with sample data
//make sure mongoDB server is running
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
    initDB();
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

//initData is an object with key data which is an array of listing objects
const initDB = async () => {
  await Listing.deleteMany({});// Clear existing listings
  // Add owner field to each listing object
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "688527e88491e76271f2932d", // adding owener field to each listing
  }));
  await Listing.insertMany(initData.data);
  console.log("Database initialized with sample data.");
};
