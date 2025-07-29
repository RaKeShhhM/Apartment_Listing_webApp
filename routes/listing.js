const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError');
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");



//validating midddlewares
// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);

//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");//combined all err msg and displaying
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// }

//index route
router.get(
    "/",
    wrapAsync( listingController.index)
    
);

//post route to handle image
/*
router.post(
  "/",
  isLoggedIn,
  //validateListing,
  upload.single("listing[image]"),
  wrapAsync((req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    res.send(req.file); // just confirming the upload worked
  }
));
*/


//new route.. it is above show route so that /listings/new .. here "new" ko id na samjh le aur isi route pr req send ho

    // router.get(
    //     "/new",
    //     isLoggedIn,
    //     (req,res)=>{
    //     //user login ? is checked before creating new listings
    //     /*console.log(req.user); implemented using  middleware.js
    //     if(!req.isAuthenticated()){
    //         req.flash("error","you must be logged in to create a listing");
    //         return res.redirect("/login");
    //     }*/
    //     res.render("listings/new.ejs");
    // });
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
//     (req,res)=>{
//         //user login ? is checked before creating new listings
//         /*console.log(req.user); implemented using  middleware.js
//         if(!req.isAuthenticated()){
//             req.flash("error","you must be logged in to create a listing");
//             return res.redirect("/login");
//     }*/
//     res.render("listings/new.ejs");
// }
);

// SHOW route
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
//     async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id)
//     .populate({
//         path: "reviews",
//         populate: {
//             path: "author",
//         },
//     })
//     .populate("owner");
//     if (!listing) {
//       req.flash("error", "Listing you requested doesn't exist anymore");
//       return res.redirect("/listings");   // ← add return here
//     }
//     // Only render if listing was found
//     res.render("listings/show.ejs", { listing });
//   })

);


//create route.. 1st validateListing called if req comes at this route
router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)

//      async (req,res)=>{
//     // const {title,description,image,price,country,location}= req.body; basic way to retrive data // when listing[] is not used in new.ejs
//     //  console.log(req.body)
//     // ;//req.body will give { listing : {title:"",..}}
//     /*
//     if(!req.body.listing){
//         throw new ExpressError(400,"send valid data for listing");
//     }
//         */
//     let result=listingSchema.validate(req.body);//will validate inputs from server side(if there is missing any usin joi npm)
//     //console.log(res);
//     //sends result of error, when we send details from hopscotch but some details are missing like title which is fixed shown by joi
//     if(result.error){
//         throw new ExpressError(400,result.error);
//     }
    
//     const newListing= new Listing(req.body.listing);
//     newListing.owner=req.user._id;
//     await newListing.save();

//     req.flash("success","New Listing Created");
//     res.redirect("/listings");
//     //console.log(Listing);
//    // const newListing=new Listing(req.body.listing);
// })

);

//edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.randerEditForm
        
//         async (req,res) =>{
//         let {id}=req.params;
//         const listing=await Listing.findById(id);
//         if (!listing) {
//             req.flash("error", "Listing you requested doesn't exist anymore");
//             return res.redirect("/listings");   // ← add return here
//         }
        
//         res.render("listings/edit.ejs",{listing});  
//     }
// )
));

//Update Route
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.updateListing)
//      async (req,res) => {
//     if(!req.body.listing){
//         throw new ExpressError(400,"send valid data for listing");
//     }
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});// deconstructing the object and again forming the updated object
//     req.flash("success","Listing Updated!");
//     res.redirect(`/listings/${id}`);
// })

);

//Delete Route
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
    
    //async(req,res)=>{
    //     let {id}=req.params;
    //     let deletedListing=await Listing.findByIdAndDelete(id);
    //     console.log(deletedListing);
    //     req.flash("success","Listing deleted!");
    //     res.redirect("/listings");
    // }
);

module.exports=router;