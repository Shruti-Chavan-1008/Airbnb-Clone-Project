const Review = require("../models/review.js");
const Listing=require("../models/listings.js");

module.exports.createreview=async(req,res)=>{
   let listings =await Listing.findById( req.params.id);
   let newReview= new Review(req.body.review); 
   newReview.author=req.user._id;
   listings.reviews.push(newReview);
   console.log(newReview);
   await newReview.save();
   await listings.save();
   console.log("responance is save");
   req.flash("success","Review is created");
   res.redirect("/listings");
    
 };


 module.exports.deleteview=async(req,res) =>{
   let { id , reviewId }= req.params;
     
    await Listing.findByIdAndUpdate(id ,{$pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is deleted");
    res.redirect(`/listings/${id}`);
 
  
 };
  