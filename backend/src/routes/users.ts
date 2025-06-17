import express from 'express';
const expressValidator = require('express-validator');
import { auth } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { UserController } from '../controllers/users';

const router = express.Router();
const userController = new UserController();

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put(
  '/profile',
  auth,
  [
    expressValidator.body('firstName').optional().trim(),
    expressValidator.body('lastName').optional().trim(),
    expressValidator.body('email').optional().isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('company').optional().trim(),
    expressValidator.body('address').optional().trim(),
  ],
  validateRequest,
  userController.updateProfile
);

// Update user settings
router.put(
  '/settings',
  auth,
  [
    expressValidator.body('notifications').optional().isBoolean(),
    expressValidator.body('theme').optional().isIn(['light', 'dark']),
    expressValidator.body('language').optional().isString(),
    expressValidator.body('timezone').optional().isString(),
  ],
  validateRequest,
  userController.updateSettings
);

// Get user notifications
router.get('/notifications', auth, userController.getNotifications);

// Mark notification as read
router.put('/notifications/:id/read', auth, userController.markNotificationAsRead);

// Delete notification
router.delete('/notifications/:id', auth, userController.deleteNotification);

// Get user activity log
router.get('/activity', auth, userController.getActivityLog);

export default router; 