const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
         type: String, 
         required: true, 
        },
    created: { 
        type: Date, 
        index: true, 
        default: Date.now 
    },
    user_type: { 
        type: String,
        // required: true
     }

});


UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', UserSchema);