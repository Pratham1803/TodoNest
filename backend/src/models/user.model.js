// Importing necessary modules
import mongoose from 'mongoose'; // MongoDB ODM for schema management
import bcrypt from 'bcrypt'; // Library for hashing passwords
import jsonwebtoken from 'jsonwebtoken'; // Library for generating JWT tokens

// Defining the User schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String, // Name should be a string
            required: true, // Name is mandatory
            trim: true, // Removes unnecessary spaces
        },
        email: {
            type: String, // Email should be a string
            required: true, // Email is mandatory
            unique: true, // Ensures no duplicate emails in the database
            lowercase: true, // Converts email to lowercase for consistency
            trim: true, // Removes leading and trailing spaces
        },
        password: {
            type: String, // Password should be a string
            required: true, // Password is mandatory
            minlength: 6, // Minimum length of 6 characters for security
        },
        createdAt: {
            type: Date, // Stores the date when the user is created
            default: Date.now, // Sets the default value to the current timestamp
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Middleware: Hash the password before saving the user document
UserSchema.pre('save', async function (next) {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next(); // Proceed to save the user document
});

// Method: Compare entered password with the hashed password in the database
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

// Exporting the User model to use in other parts of the application
export const User = mongoose.model('User', UserSchema);
