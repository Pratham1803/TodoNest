const User = require('../models/user.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

const options = {
    httpOnly: true,
    secure: true,
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToekn();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(`Error is Generating Tokens:\n ${error}`);
        throw new ApiError(
            500,
            'something went wrong, while generating access and refresh token'
        );
    }
};

const registerUserHandler = asyncHandler(async (req, res) => {
    // data collect
    // verify
    // store
    // send response

    const { name, email, password } = req.body;

    if (!(name || email || password)) {
        throw new ApiError(400, 'Name, Email and Password required');
    }

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
        throw new ApiError(409, 'User With same Email id already exists');
    }

    const newUser = await User.create({
        name,
        email,
        password,
    });

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(newUser);

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    newUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                'User Registered Succesfully'
            )
        );
});

const loginUserHandler = asyncHandler(async (req, res) => {
    // collect data and verify it
    // check in data base that user exists or not
    // check password
    // generate tokens
    // RETURN RES

    const { email, password } = req.body;

    if (!(email, password)) {
        throw new ApiError(400, 'email id and password is required!!');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid user credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
});

const logOutUserHandler = asyncHandler(async (req, res) => {
    // clear token from data base
    // clear from cookie and send response
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'User Logged out succesfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // collect refresh token and check that exists or not
    // decode and find the decoded id in database
    // find user with id and check exists or not
    // validate the refresh token with database refresh token
    // return res

    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'unauthorized Request');
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, 'Invalid Refresh Token');
        }

        if (incomingRefreshToken != user?.refreshToken) {
            throw new ApiError(401, 'Refresh token is expired or used');
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user?._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken)
            .cookie('refreshToken', refreshToken)
            .json(
                new ApiResponse(
                    200,
                    {
                        user,
                        accessToken,
                        refreshToken,
                    },
                    'User Refreshed access token successfully'
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid refresh token');
    }
});

module.exports = {
    registerUserHandler,
    loginUserHandler,
    logOutUserHandler,
    refreshAccessToken,
};
