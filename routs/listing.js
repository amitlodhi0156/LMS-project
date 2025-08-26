const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema} = require("../schema.js");
const flash = require("connect-flash");
const {isLoggedIn, isOwner} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudCongif.js");
const upload = multer({storage});


// const validateListing = (req, res ,next)=>{
//     let {error}  = listingSchema.validate(req.body);
    
//     if(error){
//         let errMsg = error.details.map((el)=> el.message).join(",");
//         throw new expressError(400, errMsg);
//     }else{
//         next();
//     }
// }; 


// index and create rout
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"), wrapAsync(listingController.createListing));



// New & Create Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


// show , update and delete route 
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), wrapAsync(listingController.updateListings))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListings))






// Edit Route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));







module.exports = router;