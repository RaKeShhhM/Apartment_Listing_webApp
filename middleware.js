const Listing=require("./models/listing");
const Review=require("./models/review");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");

//checks if user is logged in or not
/*
module.exports.isLoggedIn=(req,res,next)=>{
    //console.log(req); //prints all the details of requests
    //console.log(req.path,"..",req.originalUrl);
    //req.path -> curr path and req.originalUrl-> desired path user was trying to access
    req.session.redirectUrl=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","you must be LOG IN");
        return res.redirect("/login");
    }
    next();
};

*/
// module.exports.isLoggedIn = (req, res, next) => {
//     // 🧠 Only save redirectUrl for GET requests
//     if (req.method === "GET") {
//         req.session.redirectUrl = req.originalUrl;
//     }
//     if (!req.isAuthenticated()) {
//         req.flash("error", "You must be LOGGED IN");
//         return res.redirect("/login");
//     }
//     next();
// };


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Save redirectUrl as the page they came from
        req.session.redirectUrl = req.headers.referer || '/listings';
        req.flash("error", "You must be LOGGED IN");
        return res.redirect("/login");
    }
    next();
};



module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>
            el.message
        ).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

};


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>
            el.message
        ).join(",");
        throw new ExpressError(400,errMsg);
    }else {
        next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewsId}=req.params;
    //console.log("Review ID from params:", reviewsId);

    let review=await Review.findById(reviewsId);
    //console.log(review);
    if (review && review.author) {
        console.log(review.author.username);
    }

    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of the REVIEW");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


// module.exports.isReviewAuthor = async (req, res, next) => {
//     let { id, reviewId } = req.params;
//     let review = await Review.findById(reviewId);

//     // ✅ Check if review exists first
//     if (!review) {
//         req.flash("error", "Review not found!");
//         return res.redirect(`/listings/${id}`);
//     }

//     // ✅ Optional: Log author if present
//     if (review.author) {
//         console.log("Author ID:", review.author);
//     }

//     // ✅ Now it's safe to access review.author
//     if (!review.author.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of the REVIEW");
//         return res.redirect(`/listings/${id}`);
//     }

//     next();
// };
