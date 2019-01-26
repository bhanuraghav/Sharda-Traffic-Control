const express= require("express"),
    router = express.Router(),
    passport= require("passport");

router.get("/",(req,res)=> {
	res.render("testhome");
})

//Show Login Form
router.get("/login",(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        res.render("login");
    }	
})

router.post("/login",(req,res,next) => {
    console.log(req.body);
    next();
},passport.authenticate("local-login",{	
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
}));

// show the signup form
router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', { message: 'success' });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



// Logout route
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged you out");
	res.redirect("/");
})

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}