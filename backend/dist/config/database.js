"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/propertypad';
        console.log('Attempting to connect to MongoDB...');
        // Mongoose 7 no longer requires useNewUrlParser and useUnifiedTopology
        mongoose_1.default.set('strictQuery', false);
        const conn = await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database name: ${conn.connection.name}`);
        // Log environment variables after connection (for debugging)
        console.log('Environment:', process.env.NODE_ENV);
        console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
        console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
        // Log connection events
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.info('MongoDB reconnected');
        });
        // Handle application termination
        process.on('SIGINT', async () => {
            try {
                await mongoose_1.default.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            }
            catch (err) {
                console.error('Error during MongoDB disconnection:', err);
                process.exit(1);
            }
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};
exports.default = connectDB;
