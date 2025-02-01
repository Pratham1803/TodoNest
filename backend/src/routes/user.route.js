// Importing the Router module from Express to define routes
import { Router } from 'express';

// Importing user-related controller functions
import {
    registerUser, // Handles user registration
    loginUser, // Handles user login
    logOutUser, // Handles user logout
    refreshAccessToken, // Handles token refreshing
} from '../controllers/user.controller.js';

// Importing authentication middleware to protect routes
import { verifyJWT } from '../middlewares/auth.middleware.js';

// Creating an instance of the Express router
const router = Router();

// Public route: User registration (POST request)
router.route('/register').post((req, res, next) => {
    console.log(
        `name: ${req.body.name}, email: ${req.body.email}, password: ${req.body.password}`
    );
    next();
}, registerUser);

// Public route: User login (POST request)
router.route('/login').post(loginUser);

// Secured route: User logout (POST request) - Requires authentication
router.route('/logout').post(verifyJWT, logOutUser);

// Public route: Refresh access token (POST request)
router.route('/refresh-token').post(refreshAccessToken);

// Exporting the router to be used in the main app
export default router;
