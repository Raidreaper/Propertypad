"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const properties_1 = __importDefault(require("./routes/properties"));
const tenants_1 = __importDefault(require("./routes/tenants"));
const maintenance_1 = __importDefault(require("./routes/maintenance"));
const chat_1 = __importDefault(require("./routes/chat"));
const community_1 = __importDefault(require("./routes/community"));
// Load environment variables from the correct path
const envPath = path_1.default.resolve(__dirname, '../.env');
console.log('Loading .env file from:', envPath);
dotenv_1.default.config({ path: envPath });
// Debug: Log all environment variables
console.log('Environment variables loaded:', {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
    NODE_ENV: process.env.NODE_ENV
});
// Initialize express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/properties', properties_1.default);
app.use('/api/tenants', tenants_1.default);
app.use('/api/maintenance', maintenance_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api/community', community_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});
// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await (0, database_1.default)();
        // Then start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Environment:', process.env.NODE_ENV);
            console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
            console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
