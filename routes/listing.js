const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError');
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require('multer');

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get(
  "/",
  wrapAsync(listingController.index)
);

router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);

// Search Route for Listings based on title, description, location, or country 
router.get("/search", async (req, res) => {
  const query = req.query.query || "";

  try {
    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });

    res.render("listings/index.ejs", { allListings: listings });
  } catch (e) {
    console.error("Search route error:", e);
    res.status(500).send("Something went wrong");
  }
});

// Show Route for a specific Listing
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);

// Create Route for a new Listing
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit and Update Routes for a specific Listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.randerEditForm)
);

// Update Route for a specific Listing 
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route for a specific Listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
