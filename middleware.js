const Listing = require("./models/listing");

module.exports.isLoggedIn =  (req , res , next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must logged in to create listing");
       return  res.redirect("/login");
    }
    next();
}

module.exports.isOwner = async(req , res, next)=>{
     let  id = req.params.id;
   
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
         req.flash("error", "You are not the owner of this Listing");
       return  res.redirect(`/listings/${id}`);
    }
    next();
}
