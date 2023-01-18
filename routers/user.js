const userController = require('../controllers/user');
const mongoose = require("mongoose");
const passport = require("passport");

const express = require('express');

const authrouter = express.Router();

authrouter.get('/register', userController.showRegister);
authrouter.get('/login', userController.showLogin);
authrouter.get('/reset', userController.showReset);
authrouter.get('/profile', userController.showProfile);
authrouter.get('/logout', userController.logout);

authrouter.post('/register', userController.register);
authrouter.post('/login', passport.authenticate(
    'local',
    { failureRedirect: "/auth/login" }
), userController.login);
authrouter.post('/reset', userController.reset);

module.exports = authrouter;