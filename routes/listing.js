const express=require("express");
const router=express.Router();
const Listing=require("../models/listings.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {isLoggedIn,isOwner,validateListing,}=require("../middleware.js");
const  listingController  =require("../controllers/listing.js")
const multer  = require('multer');
const {storage}=require("../cloudeConfig.js");
const upload = multer({ storage });

 
router
  .route("/")
   .get( wrapAsync(listingController.index))
   .post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.postlisting));
  
router.get("/new",isLoggedIn,listingController.RenderNew);

router
 .route("/:id")
   .get( wrapAsync(listingController.showlisting))
   .put( isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updatelisting))
   .delete( isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

 
 
 
 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editlisting));
 router.get(
  "/category/:category",
  wrapAsync(listingController.categoryListing)
);
 

module.exports=router;
 