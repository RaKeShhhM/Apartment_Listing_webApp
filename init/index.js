//initializing sample datas from data.js folder to the listing collection we created using this
const mongoose = require("mongoose");
const initData= require("./data.js");

const Listing=require("../models/listing.js")//going from init folder to models so ../

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";


main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(mongo_url);

}

const initDB = async () => {
    await Listing.deleteMany({});//deletd already exiting tuples

    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"688527e88491e76271f2932d",
    }));
    await Listing.insertMany(initData.data);

    console.log("data was initialized");
}

const listing = await Listing.findById("YOUR_LISTING_ID");




initDB();