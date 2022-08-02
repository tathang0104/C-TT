const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('users', user);