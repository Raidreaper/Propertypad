import express from 'express';
import { validateRequest } from '../middleware/validate';
const expressValidator = require('express-validator');

const router = express.Router();

// Test route with validation
router.post(
  '/validate',
  [
    expressValidator.body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    expressValidator.body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  validateRequest,
  (req, res) => {
    try {
      console.log('Received request body:', req.body);
      res.json({
        success: true,
        message: 'Validation passed',
        data: req.body
      });
    } catch (error) {
      console.error('Error in test route:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

export default router; 