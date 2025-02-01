// Importing required modules
import dotenv from 'dotenv'; // To load environment variables from a .env file
import connectDb from './db/index.js'; // Importing the function to connect to the database
import { app } from './app.js'; // Importing the Express app instance

// Load environment variables from the specified .env file
dotenv.config({ path: './env' });

// Connect to the database and start the server once connected
connectDb()
    .then(() => {
        app.get('/todo/api/v1', (req, res) => {
            res.send('Hello World');
        });

        // Start the server and listen on the specified port (default to 3000 if no PORT is specified)
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Connected to port ${process.env.PORT}`); // Log success message
        });        
    })
    .catch((err) => {
        // Log error message if connection to the database fails
        console.log(
            `Failed to connect to port ${process.env.PORT} with error ${err.message}`
        );
    });
