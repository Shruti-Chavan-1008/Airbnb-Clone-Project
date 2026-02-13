const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl }=require("../middleware.js");
 
const userController=require("../controllers/user.js");
 
router
 .route("/signup")
   .get( userController.signup)
   .post(userController.postsingup);


router
 .route("/login")
  .get(userController.login)
  .post( saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login',failureFlash: true,}),
        userController.loginpost);

router.get("/logout",userController.logout);




module.exports=router;