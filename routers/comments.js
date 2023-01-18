const commentController = require('../controllers/comments');

const express = require('express');

const commentrouter = express.Router();

commentrouter.get('/create', commentController.create);
commentrouter.get('/update', commentController.update);

commentrouter.post('/create', commentController.create);
commentrouter.post('/delete', commentController.delete);
commentrouter.post('/update', commentController.update);

module.exports = commentrouter;