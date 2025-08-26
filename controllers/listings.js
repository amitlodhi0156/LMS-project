const Listing = require("../models/listing");


module.exports.index = async (req,res)=>{
 let allListings =   await Listing.find({});
 res.render("listings/index.ejs", {allListings});
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res)=>{
    let  { id }   = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    // If no image uploaded → default from schema will apply

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let  { id }   = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",  {listing});
};


module.exports.updateListings = async (req, res) => {
    const { id } = req.params;

    // Find listing first
    const listing = await Listing.findById(id);

    // Update all fields dynamically from req.body.listing
    Object.assign(listing, req.body.listing);

    // If a new image uploaded, replace it
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await listing.save();

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${listing._id}`);
};




module.exports.deleteListings = async (req,res)=>{
let {id }= req.params;
 await Listing.findByIdAndDelete(id);
res.redirect("/listings");
};