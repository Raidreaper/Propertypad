"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const expressValidator = require('express-validator');
const validateRequest = (req, res, next) => {
    try {
        console.log('Validating request:', req.body);
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }
        next();
    }
    catch (error) {
        console.error('Error in validation middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.validateRequest = validateRequest;
