import { Router } from 'express';
import { validateRequest } from '../middleware/validate';
import { MaintenanceController } from '../controllers/maintenance';
import { auth } from '../middleware/auth';
const expressValidator = require('express-validator');

const router = Router();
const maintenanceController = new MaintenanceController();

// Get all maintenance requests
router.get('/', auth, maintenanceController.getAllMaintenance);

// Get maintenance request by ID
router.get('/:id', auth, maintenanceController.getMaintenanceById);

// Create maintenance request
router.post(
  '/',
  auth,
  [
    expressValidator.body('propertyId').notEmpty().withMessage('Property ID is required'),
    expressValidator.body('title').notEmpty().withMessage('Title is required'),
    expressValidator.body('description').notEmpty().withMessage('Description is required'),
    expressValidator.body('priority')
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
  ],
  validateRequest,
  maintenanceController.createMaintenance
);

// Update maintenance request
router.put(
  '/:id',
  auth,
  [
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
  ],
  validateRequest,
  maintenanceController.updateMaintenance
);

// Delete maintenance request
router.delete('/:id', auth, maintenanceController.deleteMaintenance);

// Get maintenance requests by property
router.get('/property/:propertyId', auth, maintenanceController.getMaintenanceRequestsByProperty);

// Get maintenance requests by tenant
router.get('/tenant/:tenantId', auth, maintenanceController.getMaintenanceRequestsByTenant);

// Update maintenance request status
router.patch(
  '/:id/status',
  auth,
  [
    expressValidator.body('status').isIn(['pending', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
    expressValidator.body('notes').optional().notEmpty().withMessage('Notes cannot be empty'),
  ],
  validateRequest,
  maintenanceController.updateMaintenanceStatus
);

export default router; 