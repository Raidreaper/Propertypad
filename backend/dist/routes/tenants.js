"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressValidator = require('express-validator');
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const tenants_1 = require("../controllers/tenants");
const router = express_1.default.Router();
const tenantController = new tenants_1.TenantController();
// Get all tenants
router.get('/', auth_1.auth, tenantController.getAllTenants);
// Get tenant by ID
router.get('/:id', auth_1.auth, tenantController.getTenantById);
// Create tenant
router.post('/', auth_1.auth, [
    expressValidator.body('firstName').trim().notEmpty().withMessage('First name is required'),
    expressValidator.body('lastName').trim().notEmpty().withMessage('Last name is required'),
    expressValidator.body('email').isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('propertyId').notEmpty().withMessage('Property ID is required'),
    expressValidator.body('leaseStart').isDate().withMessage('Valid lease start date is required'),
    expressValidator.body('leaseEnd').isDate().withMessage('Valid lease end date is required'),
    expressValidator.body('rentAmount').isNumeric().withMessage('Rent amount must be a number'),
], validate_1.validateRequest, tenantController.createTenant);
// Update tenant
router.put('/:id', auth_1.auth, [
    expressValidator.body('firstName').optional().trim(),
    expressValidator.body('lastName').optional().trim(),
    expressValidator.body('email').optional().isEmail().withMessage('Please enter a valid email'),
    expressValidator.body('phone').optional().trim(),
    expressValidator.body('propertyId').optional().notEmpty().withMessage('Property ID is required'),
    expressValidator.body('leaseStart').optional().isDate().withMessage('Valid lease start date is required'),
    expressValidator.body('leaseEnd').optional().isDate().withMessage('Valid lease end date is required'),
    expressValidator.body('rentAmount').optional().isNumeric().withMessage('Rent amount must be a number'),
], validate_1.validateRequest, tenantController.updateTenant);
// Delete tenant
router.delete('/:id', auth_1.auth, tenantController.deleteTenant);
// Get tenant's payment history
router.get('/:id/payments', auth_1.auth, tenantController.getTenantPayments);
// Get tenant's maintenance requests
router.get('/:id/maintenance', auth_1.auth, tenantController.getTenantMaintenance);
// Record rent payment
router.post('/:id/payments', auth_1.auth, [
    expressValidator.body('amount').isFloat({ min: 0 }).withMessage('Payment amount must be a positive number'),
    expressValidator.body('paymentDate').isISO8601().withMessage('Valid payment date is required'),
    expressValidator.body('paymentMethod').notEmpty().withMessage('Payment method is required'),
], validate_1.validateRequest, tenantController.recordPayment);
exports.default = router;
