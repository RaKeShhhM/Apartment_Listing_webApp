const User=require("../models/user.js");

module.exports.signup=  async (req,res)=>{  
    try{
        let {username,email,password}=req.body;
       const newUser=new User({email,username});
       const registeredUser=await User.register(newUser, password);
       console.log(registeredUser);

       //after signup.. user automatically logins
        req.login(registeredUser,(err)=>{
          if(err){
            return next(err);
          }
          req.flash("success", "Welcome to Wanderlust!");
          res.redirect("/listings");
        })

        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

module.exports.login=async (req,res)=>{
        req.flash("success","Welcome back to Wanderlust");
        console.log(res.locals.redirectUrl);
        let redirectUrl=res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    };