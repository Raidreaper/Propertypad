import express from 'express';
const expressValidator = require('express-validator');
import { auth } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { TenantController } from '../controllers/tenants';

const router = express.Router();
const tenantController = new TenantController();

// Get all tenants
router.get('/', auth, tenantController.getAllTenants);

// Get tenant by ID
router.get('/:id', auth, tenantController.getTenantById);

// Create tenant
router.post(
  '/',
  auth,
  [
    expressValidator.body('firstName').trim().notEmpty().withMessage('First name is required'),
    expressValidator.body('lastName').trim().notEmpty().withMessage('Last name is required'),
    expressValidator.body('email').isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('propertyId').notEmpty().withMessage('Property ID is required'),
    expressValidator.body('leaseStart').isDate().withMessage('Valid lease start date is required'),
    expressValidator.body('leaseEnd').isDate().withMessage('Valid lease end date is required'),
    expressValidator.body('rentAmount').isNumeric().withMessage('Rent amount must be a number'),
  ],
  validateRequest,
  tenantController.createTenant
);

// Update tenant
router.put(
  '/:id',
  auth,
  [
    expressValidator.body('firstName').optional().trim(),
    expressValidator.body('lastName').optional().trim(),
    expressValidator.body('email').optional().isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('propertyId').optional().notEmpty().withMessage('Property ID is required'),
    expressValidator.body('leaseStart').optional().isDate().withMessage('Valid lease start date is required'),
    expressValidator.body('leaseEnd').optional().isDate().withMessage('Valid lease end date is required'),
    expressValidator.body('rentAmount').optional().isNumeric().withMessage('Rent amount must be a number'),
  ],
  validateRequest,
  tenantController.updateTenant
);

// Delete tenant
router.delete('/:id', auth, tenantController.deleteTenant);

// Get tenant's payment history
router.get('/:id/payments', auth, tenantController.getTenantPayments);

// Get tenant's maintenance requests
router.get('/:id/maintenance', auth, tenantController.getTenantMaintenance);

// Record rent payment
router.post(
  '/:id/payments',
  auth,
  [
    expressValidator.body('amount').isFloat({ min: 0 }).withMessage('Payment amount must be a positive number'),
    expressValidator.body('paymentDate').isISO8601().withMessage('Valid payment date is required'),
    expressValidator.body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  ],
  validateRequest,
  tenantController.recordPayment
);

export default router; 