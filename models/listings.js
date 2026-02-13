const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema=mongoose.Schema;

const ListingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    },
    image:{
        url:String,
        filename:String,

    },
    price:Number,
    location:String,
    country:String,
    category: {
  type: String,
  enum: [
    "mountain",
    "rooms",
    "trending",
    "iconic",
    "castles",
    "amazing-pools",
    "camping",
    "beach",
    "farms",
    "arctic",
    "igloo"
  ]
},
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
   geometry: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number],
    default: [0, 0]
  },
   
},
 
});

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews }});
    }
    
});


 
const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;