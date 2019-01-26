const express= require("express"),
    router = express.Router();
const payumoney =  require('payumoney-node'); 
const challan = require('./../server/models/challan');

const {MERCHANT_KEY} = require('./../config/keys');
const {MERCHANT_SALT} = require('./../config/keys');
const {AUTHORIZATION_HEADER} = require('./../config/keys');

//Test Card :  4012001037141112

//Set keys
payumoney.setKeys(MERCHANT_KEY, MERCHANT_SALT, AUTHORIZATION_HEADER);

//Set Mode
payumoney.isProdMode(false); // production = true, test = false

router.post('/success/:id/:id2',isLoggedIn,(req,res)=>{
    var challanNumber = req.params.id;
    var txnid = req.params.id + '_' + req.user.licenceNo;
    var amount = req.params.id2;

    challan.findOneAndUpdate({challanNumber},{paymentStatus: true},function(err,result){
        if(err){
            console.log(err);
            req.flash("error","Some Error has occured");
            res.redirect('/')
        }
        console.log(result);
        req.flash("success","Transaction Successful");
        res.redirect(`/`);
    })
})

router.post('/fail',isLoggedIn,(req,res)=>{
    req.flash("error","Transaction Failed");
    res.redirect(`/`);
})

router.get('/:id',isLoggedIn,(req,res)=>{
    const challanNumber  = req.params.id;
    challan.findOne({challanNumber},function(err,result){
        console.log('Challan Result : ',result);
        if(err){
            console.log(err);
           res.redirect('/');
        }
        if(result){
            res.render('payumoney',{
                result,
                user : req.user
            });
        }
        else{
            res.redirect('/');
        }
    })
})


router.post('/:id',isLoggedIn,(req,res)=>{
    const challanNumber = req.params.id;

    challan.findOne({challanNumber},function(err,result){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else if(result){
            var transaction_id = result.challanNumber + '_' + result.licenceNo;
            var final_amount = result.challanAmount;
            var paymentData = {
                productinfo : result.challanNumber,
                txnid: transaction_id,
                amount: final_amount,
                email: result.email,
                phone: result.phone,
                lastname: result.lastname,
                firstname: result.firstname,
                surl: `http://localhost:3000/paychallan/success/${result.challanNumber}/${final_amount}`, //"http://localhost:3000/payu/success"
                furl: "http://localhost:3000/paychallan/fail", //"http://localhost:3000/payu/fail"
            }
            console.log(paymentData);
   
            payumoney.makePayment(paymentData, function(error, response) {
                if (error) {
                  // Some error
                  console.log(error);
                } else {
                  // Payment redirection link
                  res.redirect(response);
                 // console.log(response);
                }
            });
        }
        else{
            res.redirect('/');
        }
    })
   
})


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error','You are not logged in');
		res.redirect('/users/login');
	}
}