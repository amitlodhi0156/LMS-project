const User = require("../models/user.js");


module.exports.goToSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUsers = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
      if(err){
        return next(err);
      }
       req.flash("success", "Welcome to Listings!");
        return res.redirect("/listings"); 
        });

        
    } catch (e) {
        req.flash("error", e.message); // instead of e.mess we can write custom mess __>> "user already exist"
        return res.redirect("/signup");   
    }
};



module.exports.goToLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUsers = async(req, res)=>{
       req.flash("success", "wellcome back to wanderlust");
       res.redirect("/listings");
};

module.exports.logoutUser = (req, res, next )=>{
  req.logOut((err)=>{
    if(err){
       return  next(err);
    }
    req.flash("success", "you are logged out now");
    res.redirect("/listings");
  })
};