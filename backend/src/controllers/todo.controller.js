const Todo = require('../models/todo.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const addToDoHandler = asyncHandler(async (req, res) => {
    // collect data and verify it
    // insert
    // send res

    const { title, description, isComplete = false } = req.body;

    if (!(title || description)) {
        throw new ApiError(404, 'title and description is required');
    }

    const id = req.user._id;

    const todo = await Todo.create({
        userId: id,
        title: title,
        description: description,
        isComplete: isComplete,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, todo, 'New ToDo Added Successfully.'));
});

const getAllToDoHandler = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const todos = await Todo.find({ userId: id });

    if (todos.length === 0){
        return res.status(200).json(new ApiResponse(200, todos, 'No ToDos Available.'));    
    }

    return res.status(200).json(new ApiResponse(200, todos, 'Sent all todos'));
});

const getSingleToDoHandler = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const todoId = req.params.id;
    const todo = await Todo.find({ _id: todoId, userId: id });

    if(todo.length === 0){
        throw new ApiError(404, 'Todo not found');
    }
    
    return res.status(200).json(new ApiResponse(200, todo, 'Sent todos'));
});

const deleteToDoHandler = asyncHandler(async (req, res) => {

});

const updateToDoHandler = asyncHandler(async (req, res) => {});

module.exports = {
    addToDoHandler,
    getAllToDoHandler,
    getSingleToDoHandler,
    deleteToDoHandler,
    updateToDoHandler,
};
