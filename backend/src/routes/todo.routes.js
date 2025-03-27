const express = require('express');
const router = express.Router();
const {
    addToDoHandler,
    getAllToDoHandler,
    getSingleToDoHandler,
    deleteToDoHandler,
    updateToDoHandler,
} = require('../controllers/todo.controller');

const validateToken = require('../middlewares/auth.middleware');

// insert new todo
router
    .route('/')
    .post(validateToken, addToDoHandler)
    .get(validateToken, getAllToDoHandler);

// get only one todo from id
router.get('/:id', validateToken, getSingleToDoHandler);

// delete todo
router.delete('/:id', validateToken, deleteToDoHandler);

// update todo
router.put('/:id', validateToken, updateToDoHandler);

module.exports = router;
