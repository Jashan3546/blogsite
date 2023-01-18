const blogController = require('../controllers/blog');
const passport = require('passport');

const express = require('express');
const blogrouter = express.Router();

blogrouter.get('/create', blogController.showCreate);

blogrouter.get('/update', blogController.showUpdate);


blogrouter.post('/create', blogController.create);
blogrouter.post('/delete', blogController.delete);
blogrouter.post('/update', blogController.update);

module.exports = blogrouter;