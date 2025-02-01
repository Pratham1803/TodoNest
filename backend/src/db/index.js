// Importing mongoose, which is an Object Data Modeling (ODM) library for MongoDB
import mongoose from "mongoose";

// Importing the database name from constants.js
import { DB_NAME } from "../constants.js";

// Async function to establish a connection to the MongoDB database
const connectDb = async () => {
    try {
        // Attempting to connect to the MongoDB database using the provided URL and database name
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        // Logging a success message with the connected host information
        console.log(`\nConnected to ${connectionInstance.connection.host}`);        
    } catch (error) {
        // Logging an error message if the connection fails
        console.error(`MongoDB Connection FAILED: ${error.message}`);

        // Exiting the process with failure status (1) to indicate an error
        process.exit(1);
    }
};

// Exporting the connectDb function to be used in other parts of the application
export default connectDb;
