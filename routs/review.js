// const express = require("express");
// const { route } = require("./listing");
// const router =  express.Router(); 
// const app = express(); 



const express = require("express");
const router =  express.Router({mergeParams : true}); 
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");


const validateReview = (req, res ,next)=>{
    let {error}  = reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new expressError(400, errMsg);
    }else{
        next();
    }
};    

// POST Reviews  route
router.post("/", validateReview,  wrapAsync(reviewController.addReviews));


// DELETE REVIEW ROUTE
router.delete("/:reviewId", wrapAsync(reviewController.deleteReviews));

module.exports = router;
