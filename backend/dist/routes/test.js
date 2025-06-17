"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const expressValidator = require('express-validator');
const router = express_1.default.Router();
// Test route with validation
router.post('/validate', [
    expressValidator.body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    expressValidator.body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
], validate_1.validateRequest, (req, res) => {
    try {
        console.log('Received request body:', req.body);
        res.json({
            success: true,
            message: 'Validation passed',
            data: req.body
        });
    }
    catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
