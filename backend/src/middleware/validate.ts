import { Request, Response, NextFunction } from 'express';
const expressValidator = require('express-validator');

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Validating request:', req.body);
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array().map((error: any) => ({
          field: error.path,
          message: error.msg
        }))
      });
    }
    next();
  } catch (error) {
    console.error('Error in validation middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 