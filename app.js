if(process.env.NODE_ENV!="production"){//means only use env file during development phase not after deployment
    require("dotenv").config();
}

//console.log(process.env.CLOUD_NAME);
const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./models/listing.js");
const methodOverride = require("method-override");// for PUT req overriddes Post req in update route
const path=require("path");//for setting path_join
const { name } = require("ejs");

const ejsMate = require('ejs-mate');//for ejs mate templating (similar footer,header,css)

// const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const dburl=process.env.ATLUSDB_URL;

const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError = require('./utils/ExpressError');
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");

//routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const session=require("express-session");//for cookies
const MongoStore = require('connect-mongo');//stores session on mongo atlus

const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//const listingRoutes = require("./routes/listing.js");

//connectd to db
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(dburl);

}

app.set("view engine","ejs");//showing ejs files from views folder
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));//for reading inputs from forms... read route
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//creating store for sessions in mongo atlus db
const store=MongoStore.create({ 
    mongoUrl: dburl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,//in sec

});

store.on("error",()=>{
    console.log("error in mongo session store", err);
})

const sessionOptions={
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,//when it will expire cookie
        maxAge: 7*24*60*60*1000,//max age of expiry in milisec
        httpOnly: true,//by default true
    }
}



// app.get("/",(req,res)=>{
//     res.send("hi, i am root");

// });

app.use(session(sessionOptions));//for cookies

app.use(flash());//both these should be above routes

//after session so that we can have saved info of any acc till it's expiry date
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//too store users info
passport.deserializeUser(User.deserializeUser());// to delete

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

/*
//demo user accoutn
app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email: "student@gmail.com",
        username: "delta-student",
    });

    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
});
*/
app.use("/listings",listings);//routes-listing.js gives listings which is used here for all our outes to make app.js file shorter
app.use("/listings/:id/reviews",reviews);
app.use("/", userRouter);

//testing listing collection by inseting a sample data
// app.get("/testListing", async (req,res)=>{
//     let testSample=new Listing({
//         title: "My Villa",
//         desc:"Beautiful view",
//         price: 1322,
//         location: "Asansol, West Bengal",
//         country:"India",
//     });

//     await testSample.save();
//     console.log("sample was saved");
//     res.send("successful testing of listing");
// });

//to handle all other errors if goes to non existent routes.. 

//search
//app.use("/listings", listings);

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
   let {statusCode=500,message="something went wrong!"}=err;
   //res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{err});
});





app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

    