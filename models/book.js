const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const BookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
 });

BookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book',BookSchema);

