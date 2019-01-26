var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/',isLoggedIn, function(req, res){
	res.redirect('/');
});

router.get('/dashboard',isLoggedIn, function(req, res){
	// console.log('req.user',req.user);
	res.render('dashboard',{user : req.user} );
});

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}