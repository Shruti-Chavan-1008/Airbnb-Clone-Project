const Listing=require("./models/listings.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review = require("./models/review.js");
 

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be Login to WunderLust");
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
     req.flash("error","You are not owner of Listings");
    return res.redirect(`/listings/${id}`);
   }
   next();
};


 module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id, reviewId }=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
     req.flash("error","You did not creted this review");
    return res.redirect(`/listings/${id}`);
   }
   next();
};
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }
    next();
};
module.exports.validatereview = (req, res, next) => {
    const { error } = reviewSchema .validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }
    next();
};