"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const maintenance_1 = require("../controllers/maintenance");
const auth_1 = require("../middleware/auth");
const expressValidator = require('express-validator');
const router = (0, express_1.Router)();
const maintenanceController = new maintenance_1.MaintenanceController();
// Get all maintenance requests
router.get('/', auth_1.auth, maintenanceController.getAllMaintenance);
// Get maintenance request by ID
router.get('/:id', auth_1.auth, maintenanceController.getMaintenanceById);
// Create maintenance request
router.post('/', auth_1.auth, [
    expressValidator.body('propertyId').notEmpty().withMessage('Property ID is required'),
    expressValidator.body('title').notEmpty().withMessage('Title is required'),
    expressValidator.body('description').notEmpty().withMessage('Description is required'),
    expressValidator.body('priority')
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
], validate_1.validateRequest, maintenanceController.createMaintenance);
// Update maintenance request
router.put('/:id', auth_1.auth, [
    expressValidator.body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    expressValidator.body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    expressValidator.body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    expressValidator.body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed', 'cancelled'])
        .withMessage('Invalid status'),
], validate_1.validateRequest, maintenanceController.updateMaintenance);
// Delete maintenance request
router.delete('/:id', auth_1.auth, maintenanceController.deleteMaintenance);
// Get maintenance requests by property
router.get('/property/:propertyId', auth_1.auth, maintenanceController.getMaintenanceRequestsByProperty);
// Get maintenance requests by tenant
router.get('/tenant/:tenantId', auth_1.auth, maintenanceController.getMaintenanceRequestsByTenant);
// Update maintenance request status
router.patch('/:id/status', auth_1.auth, [
    expressValidator.body('status').isIn(['pending', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
    expressValidator.body('notes').optional().notEmpty().withMessage('Notes cannot be empty'),
], validate_1.validateRequest, maintenanceController.updateMaintenanceStatus);
exports.default = router;
