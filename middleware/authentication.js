// The approach in your middleware is efficient because it avoids unnecessary database calls for every request 
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload,'decoded payload==')
        // {
        //     userId: '67ea94229830f72a41668a83',
        //     name: 'Kazmatics',
        //     iat: 1743426594,
        //     exp: 1746018594
        //   }

        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

module.exports = auth;




// // but if you want to fetch fresh user details from the database, you can modify it like this:
// const jwt = require('jsonwebtoken');
// const { UnauthenticatedError } = require('../errors');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer')) {
//         throw new UnauthenticatedError('Authentication Invalid');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const payload = jwt.verify(token, process.env.JWT_SECRET);

//         // Fetch fresh user details from the database
//         const user = await User.findById(payload.userId).select('-password'); // Exclude password for security

//         if (!user) {
//             throw new UnauthenticatedError('Authentication Invalid');
//         }

//         req.user = user; // Attach the full user object to the request
//         next();
//     } catch (error) {
//         throw new UnauthenticatedError('Authentication Invalid');
//     }
// };

// module.exports = auth;