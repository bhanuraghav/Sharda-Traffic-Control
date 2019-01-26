var express = require('express');
var router = express.Router();
const Challans = require('./../server/models/challan');

// Get Homepage
router.get('/',isLoggedIn, function(req, res){
	res.redirect('/dashboard');
});

router.get('/dashboard',isLoggedIn, function(req, res){
	console.log('req.user : ',req.user);
	Challans.find({licenceNo : req.user.licenceNo},function(err,result){
		if(err){
			console.log(err);
			res.redirect('/');
		}

		res.render('dashboard',{user : req.user,challans : result});
	})
});

router.get('/more-info',isLoggedIn,function(req,res){
	res.render('map-google');
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