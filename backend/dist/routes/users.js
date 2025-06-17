"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressValidator = require('express-validator');
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
const userController = new users_1.UserController();
// Get user profile
router.get('/profile', auth_1.auth, userController.getProfile);
// Update user profile
router.put('/profile', auth_1.auth, [
    expressValidator.body('firstName').optional().trim(),
    expressValidator.body('lastName').optional().trim(),
    expressValidator.body('email').optional().isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('company').optional().trim(),
    expressValidator.body('address').optional().trim(),
], validate_1.validateRequest, userController.updateProfile);
// Update user settings
router.put('/settings', auth_1.auth, [
    expressValidator.body('notifications').optional().isBoolean(),
    expressValidator.body('theme').optional().isIn(['light', 'dark']),
    expressValidator.body('language').optional().isString(),
    expressValidator.body('timezone').optional().isString(),
], validate_1.validateRequest, userController.updateSettings);
// Get user notifications
router.get('/notifications', auth_1.auth, userController.getNotifications);
// Mark notification as read
router.put('/notifications/:id/read', auth_1.auth, userController.markNotificationAsRead);
// Delete notification
router.delete('/notifications/:id', auth_1.auth, userController.deleteNotification);
// Get user activity log
router.get('/activity', auth_1.auth, userController.getActivityLog);
exports.default = router;
