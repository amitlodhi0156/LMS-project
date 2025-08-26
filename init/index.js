const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected succssfully");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner : "68a537c0c635f088ca70b4bd"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised")
}

initDB();