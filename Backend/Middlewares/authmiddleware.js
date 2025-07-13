const userModel = require('../Models/Usemodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../Models/Usemodel');
// const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// module.exports.authCaptain = async (req, res, next) => {
//     try {
//         const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
//         if (!token) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const isBlacklisted = await blackListTokenModel.findOne({ token });
//         if (isBlacklisted) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const captain = await captainModel.findById(decoded._id);
        
//         if (!captain) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         req.captain = captain;
//         next();
//     } catch (err) {
//         console.error(err);
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };
