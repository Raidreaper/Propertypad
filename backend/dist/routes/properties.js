"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const property_1 = require("../controllers/property");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const propertyController = new property_1.PropertyController();
// Get all properties
router.get('/', auth_1.auth, propertyController.getAllProperties);
// Get property by ID
router.get('/:id', auth_1.auth, propertyController.getPropertyById);
// Create new property
router.post('/', auth_1.auth, [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Property name is required'),
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('type').notEmpty().withMessage('Property type is required'),
    (0, express_validator_1.body)('units').isInt({ min: 1 }).withMessage('Number of units must be at least 1'),
    (0, express_validator_1.body)('rentAmount').isFloat({ min: 0 }).withMessage('Rent amount must be a positive number'),
], validate_1.validateRequest, propertyController.createProperty);
// Update property
router.put('/:id', auth_1.auth, [
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Property name cannot be empty'),
    (0, express_validator_1.body)('address').optional().notEmpty().withMessage('Address cannot be empty'),
    (0, express_validator_1.body)('type').optional().notEmpty().withMessage('Property type cannot be empty'),
    (0, express_validator_1.body)('units').optional().isInt({ min: 1 }).withMessage('Number of units must be at least 1'),
    (0, express_validator_1.body)('rentAmount').optional().isFloat({ min: 0 }).withMessage('Rent amount must be a positive number'),
], validate_1.validateRequest, propertyController.updateProperty);
// Delete property
router.delete('/:id', auth_1.auth, propertyController.deleteProperty);
// Get property statistics
router.get('/:id/stats', auth_1.auth, propertyController.getPropertyStats);
// Get property tenants
router.get('/:id/tenants', auth_1.auth, propertyController.getPropertyTenants);
// Get property maintenance requests
router.get('/:id/maintenance', auth_1.auth, propertyController.getPropertyMaintenance);
exports.default = router;
