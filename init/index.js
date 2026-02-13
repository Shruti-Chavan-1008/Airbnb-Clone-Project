const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wunderlust";

async function main() { 
  await mongoose.connect(MONGO_URL);
  console.log("connected with DB");
}

main().catch(err => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map(obj => ({
    ...obj,
    owner: "6967e337f3c7fb342905d75e" // your user id
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

// ❌ COMMENT THIS LINE AFTER FIRST RUN
initDB();