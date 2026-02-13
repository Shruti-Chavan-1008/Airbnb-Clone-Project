const express=require("express");
const mongoose=require("mongoose");
const router=express.Router({mergeParams:true });
const Listing=require("../models/listings.js");
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {isLoggedIn,isReviewAuthor,validatereview}=require("../middleware.js");
const LocalStrategy=require("passport-local");
const reviewController=require("../controllers/reviews.js")


//review
router.post("/",isLoggedIn,validatereview, wrapAsync(reviewController.createreview));
 
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteview));
 

module.exports=router;