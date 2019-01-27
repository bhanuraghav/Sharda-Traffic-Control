const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport');
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const methodOverride = require("method-override");

const config = require('../config/config')
const PORT = process.env.PORT || 3000 ;

const app = express();
require('./../config/passport')(passport); 
require('./db/mongoose');

const routes= require('./../routes');

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
// app.use(morgan('dev'));

app.use(flash()); 
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.PASSPORT_SECRET || config.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('views',path.join(__dirname,'../views'))
app.set('view engine','ejs');


app.use(function(req,res,next){
	res.locals.user = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

app.get('/reg',async (req,res) => {
	const {registerChallan} = require('../utils/register-challan.js');
	res.send(await registerChallan());
})

app.use('/',routes);
// app.use(express.static(__dirname + '/assets'));
app.use(express.static(path.join(__dirname,'../assets')))

app.listen(PORT,console.log(`Server started on port ${PORT}`))