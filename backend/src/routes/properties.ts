import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { PropertyController } from '../controllers/property';
import { auth } from '../middleware/auth';

const router = Router();
const propertyController = new PropertyController();

// Get all properties
router.get('/', auth, propertyController.getAllProperties);

// Get property by ID
router.get('/:id', auth, propertyController.getPropertyById);

// Create new property
router.post(
  '/',
  auth,
  [
    body('name').notEmpty().withMessage('Property name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('type').notEmpty().withMessage('Property type is required'),
    body('units').isInt({ min: 1 }).withMessage('Number of units must be at least 1'),
    body('rentAmount').isFloat({ min: 0 }).withMessage('Rent amount must be a positive number'),
  ],
  validateRequest,
  propertyController.createProperty
);

// Update property
router.put(
  '/:id',
  auth,
  [
    body('name').optional().notEmpty().withMessage('Property name cannot be empty'),
    body('address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('type').optional().notEmpty().withMessage('Property type cannot be empty'),
    body('units').optional().isInt({ min: 1 }).withMessage('Number of units must be at least 1'),
    body('rentAmount').optional().isFloat({ min: 0 }).withMessage('Rent amount must be a positive number'),
  ],
  validateRequest,
  propertyController.updateProperty
);

// Delete property
router.delete('/:id', auth, propertyController.deleteProperty);

// Get property statistics
router.get('/:id/stats', auth, propertyController.getPropertyStats);

// Get property tenants
router.get('/:id/tenants', auth, propertyController.getPropertyTenants);

// Get property maintenance requests
router.get('/:id/maintenance', auth, propertyController.getPropertyMaintenance);

export default router; 