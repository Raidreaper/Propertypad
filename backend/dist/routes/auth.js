"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const expressValidator = require('express-validator');
const router = express_1.default.Router();
const authController = new auth_1.AuthController();
// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
// Protected routes
router.get('/me', auth_2.auth, authController.getCurrentUser);
// Forgot password route
router.post('/forgot-password', [
    expressValidator.body('email').isEmail().withMessage('Please enter a valid email'),
], validate_1.validateRequest, authController.forgotPassword);
// Reset password route
router.post('/reset-password', [
    expressValidator.body('token').notEmpty().withMessage('Token is required'),
    expressValidator.body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
], validate_1.validateRequest, authController.resetPassword);
// Update password route
router.put('/update-password', auth_2.auth, [
    expressValidator.body('currentPassword').notEmpty().withMessage('Current password is required'),
    expressValidator.body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
], validate_1.validateRequest, authController.updatePassword);
exports.default = router;
