const passport = require("passport");
const localstratigy = require("passport-local").Strategy;
const user = require("../models/user")
var cryptoJs = require('crypto-js');



//authentication using passport
passport.use(new localstratigy({
    usernameField: "email",
    passReqToCallback: true
},
    (req, email, password, done) => {
        //find a user and establish the identity
        user.findOne({ email: email }, (err, user) => {
            console.log(user);
            console.log(password);
            //console.log(user.salt);
            //console.log(cryptoJs.SHA256(password, user.salt));
            //console.log(user.ency_password == cryptoJs.SHA256(password, user.salt));
            if (err) {
                console.log('error in finding user in passport', err);
                return done(err);
            }
            if (!user || user.ency_password != cryptoJs.SHA256(password, user.salt)) {
                console.log('invlaid username or password in passport', err);
                return done(null, false);
            }

            return done(null, user);
        });

    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        if (err) {
            console.log("error in finding user");
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = (req, res, next) => {
    console.log('checkas;dlgf')
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/auth/login");
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;