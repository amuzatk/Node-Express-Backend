const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide name' ], minlength: 3, maxlength: 50 } ,
    email: {
        type: String,
        required: [true, 'Please provide email' ],
        unique: true,
        match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ]
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        // maxlength:12
    }
}, {timestamps: true} );

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

// UserSchema.pre('save', async function(){
//     if(!this.isModified('password')) return;
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })

UserSchema.pre('save', async function(next){//next() can be removed
    if(!this.isModified('password')) return next();//this prevents the password from being hashed again if it is not modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', UserSchema);