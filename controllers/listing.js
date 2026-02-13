const Listing=require("../models/listings.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


module.exports.RenderNew=(req,res)=>{
    res.render("listings/new.ejs" );
};


module.exports.showlisting=async(req,res)=>{
  let {id}=req.params;
  const listing= await Listing.findById( id)
  .populate( {
    path:"reviews",
    populate:{
      path:"author",
    },
  })
    .populate("owner");
  if(!listing){
    req.flash("error","Listing you requested for does not exists!");
    res.redirect("/listings");
}
  console.log(listing);
  res.render("listings/show.ejs",{ listing });

};

module.exports.postlisting=async(req,res,next)=>{
  let url= req.file.path ;
   let filename= req.filename ;
   console.log(url,"..",filename);
  const newlistings= new Listing(req.body.listing);
  newlistings.owner=req.user._id;
  newlistings.image={url,filename};
  await newlistings.save();
  req.flash("success","New Listing Created!");
   return res.redirect("/listings");

};

module.exports.editlisting=async(req,res)=>{
 let {id}=req.params;
 const listing= await Listing.findById( id);
  if(!listing){
    req.flash("error","Listing you requested for does not exists!");
    res.redirect("/listings");
}
    
   req.flash("success"," Listing is edited!",);
  return res.render("listings/edit.ejs",{listing});

};

module.exports.updatelisting = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ MUST use await
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // update fields
    Object.assign(listing, req.body.listing);

    // update image if uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save(); // ✅ ALWAYS WORKS

    req.flash("success", "Listing is edited");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", err.message);
    res.redirect("/listings");
  }
};

 
module.exports.deletelisting= async(req,res)=>{
      let {id}=req.params;
      await Listing.findByIdAndDelete(id);
      res.redirect(`/listings/${id}`);
      req.flash("success","Listing is Deleted!");
      
 };

 module.exports.categoryListing= async (req, res) => {
  const { category } = req.params;

  const listings = await Listing.find({ category });

  if (listings.length === 0) {
    req.flash("error", `No listings found for ${category}`);
    return res.redirect("/listings");
  }

  res.render("listings/category", {
    listings,
    category
  });
};