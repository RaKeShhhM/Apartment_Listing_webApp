const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
        //user login ? is checked before creating new listings
        /*console.log(req.user); implemented using  middleware.js
        if(!req.isAuthenticated()){
            req.flash("error","you must be logged in to create a listing");
            return res.redirect("/login");
    }*/
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested doesn't exist anymore");
      return res.redirect("/listings");   // ← add return here
    }
    // Only render if listing was found
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createListing= async (req,res,next)=>{
      // const {title,description,image,price,country,location}= req.body; basic way to retrive data // when listing[] is not used in new.ejs
      //  console.log(req.body)
      // ;//req.body will give { listing : {title:"",..}}
      /*
      if(!req.body.listing){
          throw new ExpressError(400,"send valid data for listing");
      }
          */


       

      //let result=listingSchema.validate(req.body);//will validate inputs from server side(if there is missing any usin joi npm)
      //console.log(res);
      //sends result of error, when we send details from hopscotch but some details are missing like title which is fixed shown by joi

    //   if(result.error){
    //       throw new ExpressError(400,result.error);
    //   }
      let url= req.file.path;
      let filename=req.file.filename;

      const newListing= new Listing(req.body.listing);
      newListing.owner=req.user._id;
      newListing.image={url,filename};
      
      await newListing.save();
  
      req.flash("success","New Listing Created");
      res.redirect("/listings");
      //console.log(Listing);
     // const newListing=new Listing(req.body.listing);
  };

  module.exports.randerEditForm=async (req,res) =>{
        let {id}=req.params;
        const listing=await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing you requested doesn't exist anymore");
            return res.redirect("/listings");   // ← add return here
        }
        let originalImageUrl=listing.image.url;
        originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
        res.render("listings/edit.ejs",{listing,originalImageUrl});  
}

module.exports.updateListing=async (req,res) => {
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    
    let {id} = req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});// deconstructing the object and again forming the updated object

    //checking if req.file exists or not
    if(typeof req.file !=="undefined"){
        let url= req.file.path;
        let filename=req.file.filename;
        listing.image={url, filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=
   async(req,res)=>{
        let {id}=req.params;
        let deletedListing=await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","Listing deleted!");
        res.redirect("/listings");
};