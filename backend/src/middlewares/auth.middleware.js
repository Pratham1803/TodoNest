const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const validateToken = asyncHandler(async (req, _, next) => {
    try {
        // collect token and check is exists or not
        // decode and verify id in database
        // check user exists or not with decoded it
        // add verified user with request

        const accessToken =
            req.cookies?.accessToken ||
            req.header('Authorization')?.replace('Bearer ', '');

        if (!accessToken) {
            throw new ApiError(401, 'Unauthorized Request');
        }

        const decodedToken = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id).select(
            ' -password -refreshToken'
        );

        if (!user) {
            throw new ApiError(401, 'Invalid Access Token');
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid access token');
    }
});

module.exports = validateToken;
