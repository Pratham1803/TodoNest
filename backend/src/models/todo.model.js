const monoogse = require('mongoose');

const toDoSchema = monoogse.Schema(
    {
        userId: {
            type: monoogse.Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        isComplete: {
            type: Boolean,
            default: false,
            require: true,
        },
    },
    { timestamps: true }
);

const ToDo = monoogse.model('ToDo', toDoSchema);
module.exports = ToDo;
