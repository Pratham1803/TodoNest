// Importing required modules
import express from 'express'; // Express framework for building the server
import cors from 'cors'; // CORS middleware to allow cross-origin requests
import cookieParser from 'cookie-parser'; // Middleware to parse cookies

// Creating an instance of the Express app
const app = express();

// Configuring CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Allows requests only from the specified origin
        credentials: true, // Allows credentials like cookies and authorization headers
    })
);

// Middleware to parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: '16kb' }));

// Middleware to parse URL-encoded data (from forms) with extended options and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Middleware to serve static files from the "public" folder
app.use(express.static('public'));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Importing user-related routes
import userRouter from './routes/user.route.js';

// Registering the user routes with a base path
app.use('/todo/api/v1/users', userRouter);

// Exporting the app instance to be used in other parts of the application (like server.js)
export { app };
