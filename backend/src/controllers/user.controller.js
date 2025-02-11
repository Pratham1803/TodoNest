import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const options = {
    httpOnly: true,
    secure: true,
};

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            `something went wrong, while generating access and refresh token, ${error.message}`
        );
    }
};

const registerUser = asyncHandler(async (req, res, next) => {
    console.log('registerUser');

    // Steps to register a user
    // 1. Get user input
    // 2. Validate user input
    // 3. Check if user already exists
    // 4. Create a new user
    // 5. Generate access and refresh tokens
    // 6. Send response with tokens

    // 1. Get user input
    const { name, email, password } = req.body;

    // 2. Validate user input
    if (!name || !email || !password) {
        console.log(`name: ${name}, email: ${email}, password: ${password}`);

        throw new ApiError(400, 'Please provide name, email, and password');
    }

    // 3. Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return next(new ApiError(400, 'User already exists with this email'));
    }

    // 4. Create a new user
    const newUser = await User.create({ name, email, password });
    console.log('newUser', newUser._id);

    // 5. Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        newUser._id
    );

    // 6. Send response with tokens
    if (!newUser) {
        throw new ApiError(500, 'User not created');
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: newUser,
                    accessToken,
                    refreshToken,
                },
                'User registered successfully'
            )
        );
});

const loginUser = asyncHandler(async (req, res, next) => {
    // Steps to login a user
    // 1. Get user data
    // 2. Validate user data, check user exists or not
    // 3. validate password
    // 4. Generate access and refresh tokens
    // 5. Send response with tokens

});
const logOutUser = asyncHandler(async (req, res, next) => {});
const refreshAccessToken = asyncHandler(async (req, res, next) => {});

export { registerUser, loginUser, logOutUser, refreshAccessToken };
