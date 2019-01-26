var LocalStrategy   = require('passport-local').Strategy;
const User = require('./../server/models/users')
// var dbconfig = require('./database');
// var connection = require('./connection');
// connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'licenceNo',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, licenceNo, password, done) { // callback with licenceNo and password from our form
        console.log('sssssssssssssssscac');
        User.findOne({licenceNo : licenceNo}, function(err, user) {
            console.log('user : ',user);
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false,{message: 'No user found.'}); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, {message: 'Oops! Wrong password.'}); // create the loginMessage and save it to session as flashdata
            }
            // if(user.password)
            // all is well, return successful user
            return done(null, user);
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with licenceNo
        usernameField : 'licenceNo',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, licenceNo, password, done) {

		// find a user whose licenceNo is the same as the forms licenceNo
		// we are checking to see if the user trying to login already exists
        User.findOne({ licenceNo :  licenceNo }, function(err, user) {
            // if there are any errors, return the error
            console.log('user : ',user);

            if (err)
                return done(err);

            // check to see if theres already a user with that licenceNo
            if (user) {
                return done(null, false, {message : 'Already exist'});
            } else {

				// if there is no user with that licenceNo
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.licenceNo    = licenceNo;
                newUser.password = newUser.generateHash(password); // use the generateHash function in our user model

				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));
};


