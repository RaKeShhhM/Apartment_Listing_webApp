const express=require("express");
const router=express.Router({mergeParams: true});//mergeParams:true so that req.params.id give us id of review addition
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError')
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const {validateReview}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");


 //validate review schema.. created middles so removed
//  const validateReview=(req,res,next)=>{
//     //console.log(req.params.id);
//     let {error}=reviewSchema.validate(req.body);

//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");//combined all err msg and displaying
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// }

//reviews post route../listings/:id/reviews->/
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview
  //   async (req, res) => {
  //   const listing = await Listing.findById(req.params.id);
  //   const newReview = new Review(req.body.review);

  //   newReview.author = req.user._id;
  //   await newReview.save(); // Save review first

  //   console.log(newReview);
  //   listing.reviews.push(newReview._id); // ✅ Push only the ID
  //   await listing.save(); // Save listing

  //   req.flash("success", "New Review Created");
  //   res.redirect(`/listings/${listing._id}`);
  // }
)
);




//to delete review../listings/:id/reviews common part

router.delete(
    "/:reviewsId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview
    //   async (req, res) => {
    //     let { id, reviewsId } = req.params;

    //     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    //     await Review.findByIdAndDelete(reviewsId);

    //     req.flash("success","Review Deleted");
    //     res.redirect(`/listings/${id}`);
    // }
  )
);

module.exports=router;