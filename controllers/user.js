const users = require('../models/user');
var cryptoJs = require('crypto-js');

module.exports.showRegister = (req, res) => {
    return res.render('userRegister');
}

module.exports.showProfile = (req, res) => {
    //console.log(req.user);
    //const user = req.user;
    return res.render('profile');
}

module.exports.showLogin = (req, res) => {
    return res.render('userLogin');
}

module.exports.showReset = (req, res) => {
    return res.render('userReset');
}

module.exports.register = async (req, res) => {
    try {
        if (req.body.password != req.body.confirmpassword) {
            console.log('password and confirm password must be same');
            req.flash('error', 'password and confirm password must be same')
            return res.redirect('back');
        }

        let user = await users.findOne({ email: req.body.email });
        if (!user) {
            await users.create(req.body);
            console.log(req.body);
            console.log('user created');
            req.flash('success', 'User created successfully')
            return res.redirect('/auth/login');
        }
        else {
            console.log('user already exist');
            console.log(user);
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Error while creating a user' + error)
        console.log('error while creating', error);
        return res.redirect('back')
    }
}


module.exports.login = async (req, res) => {
    console.log('login successful');
    req.flash('success', 'User logged in successfully')
    return res.redirect('/auth/profile');

}

module.exports.logout = async (req, res) => {
    req.logout();
    console.log('logout successful');
    req.flash('success', 'User logged out successfully')
    return res.redirect('/auth/login')
}

module.exports.reset = async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email });
        console.log(user)
        if (!user) {
            console.log("no user found with this email");
            req.flash('error', 'User not found')
            return res.redirect('back');
        }
        else {
            console.log(cryptoJs.SHA256(req.body.password, user.salt).toString(), user.ency_password)
            if (user.ency_password !== cryptoJs.SHA256(req.body.password, user.salt).toString()) {
                req.flash('error', 'Incorrect password or username')

                console.log("password is not correct");
                return res.redirect('back');
            }
            else {
                console.log(user);
                await users.findOneAndUpdate({ email: req.body.email }, { ency_password: cryptoJs.SHA256(req.body.newpassword, user.salt).toString() });
                console.log(user);
                req.flash('success', 'password changed successfully')

                console.log("password changed successfully");
                return res.redirect('profile');
            }
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'errro while changing your password' + error);

        return res.send("You have error in catch")
    }
}

