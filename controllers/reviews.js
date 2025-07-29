const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.createReview= async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    await newReview.save(); // Save review first

    console.log(newReview);
    listing.reviews.push(newReview._id); // ✅ Push only the ID
    await listing.save(); // Save listing

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
  };

module.exports.deleteReview=async (req, res) => {
    let { id, reviewsId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    await Review.findByIdAndDelete(reviewsId);

    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};