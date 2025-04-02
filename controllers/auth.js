const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')

const login = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password)//provided password againts DB hashed password
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    res.status(StatusCodes.OK).json({msg:'Login Successful', user: {name: user.name}, token: user.createJWT()}); //user.createJWT() is a method in user model
}

const register = async (req,res)=>{
    const user = await User.create({...req.body});
    const token = user.createJWT();
    // res.status(StatusCodes.CREATED).json({msg:"User Registered Successfully", data: user, token}); 
    res.status(StatusCodes.CREATED).json({msg:"User Registered Successfully", user: {name: user.name}, token}); 
}

const register2 = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            msg: "User Registered Successfully",
            user: { name: user.name },
            token,
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(new BadRequestError("This email is already registered. Please log in or use a different email."));
        }
        next(error); // Pass other errors to the global handler
    }
};

module.exports = {login, register}