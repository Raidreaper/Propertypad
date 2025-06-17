import express from 'express';
import { AuthController } from '../controllers/auth';
import { auth } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
const expressValidator = require('express-validator');

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', auth, authController.getCurrentUser);

// Forgot password route
router.post(
  '/forgot-password',
  [
    expressValidator.body('email').isEmail().withMessage('Please enter a valid email'),
  ],
  validateRequest,
  authController.forgotPassword
);

// Reset password route
router.post(
  '/reset-password',
  [
    expressValidator.body('token').notEmpty().withMessage('Token is required'),
    expressValidator.body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  authController.resetPassword
);

// Update password route
router.put(
  '/update-password',
  auth,
  [
    expressValidator.body('currentPassword').notEmpty().withMessage('Current password is required'),
    expressValidator.body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
  ],
  validateRequest,
  authController.updatePassword
);

export default router; 