// init decration module router
const express = require('express');
const router  = express.Router();
const expressLayout=require('express-ejs-layouts');
router.use(expressLayout);
const controllerHome =require('../controller').home;
const controllerSign =require('../controller').sign;



//routing begin
//home routes
router.get('/',controllerHome.Index);
//end home routes

//sign routes
router.get('/login',controllerSign.signInForm);
router.post('/login',controllerSign.signIn);
router.get('/signup',controllerSign.signUpForm);
router.post('/signup',controllerSign.signUp);
//end sign routes

//routing end

// export module router
module.exports=router;