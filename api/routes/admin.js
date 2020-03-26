const  express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    console.log(req.body.email);
    User.find({email:req.body.email})
    .exec().then(user => {
        if(user.length > 1){
            return res.status(409).json({
                message: "Email already exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    console.log(err)
                    return res.status(500).json({
                        error:err
                    })
                 } else {
                     const user = new User({
                     _id: new mongoose.Types.ObjectId(),
                     email: req.body.email,
                     password: hash,
                     username: req.body.username,
                     user_type: 'admin'
                     })
                     user.save()
                     .then(result => {
                         res.status(201).json({
                             message: 'Admin Successfully created'
                         });
                     })
                     .catch(err => {
                         res.status(500).json({
                             message: 'Admin creation failed',
                             error:err
                         });
                     });
                 }
            })
        }
    })
})

module.exports = router;
