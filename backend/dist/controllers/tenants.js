"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const Tenant_1 = __importDefault(require("../models/Tenant"));
const Payment_1 = __importDefault(require("../models/Payment"));
const Maintenance_1 = __importDefault(require("../models/Maintenance"));
class TenantController {
    // Get all tenants
    async getAllTenants(req, res) {
        try {
            const tenants = await Tenant_1.default.find().populate('property');
            res.json(tenants);
        }
        catch (error) {
            console.error('Error fetching tenants:', error);
            res.status(500).json({ message: 'Error fetching tenants' });
        }
    }
    // Get tenant by ID
    async getTenantById(req, res) {
        try {
            const tenant = await Tenant_1.default.findById(req.params.id).populate('property');
            if (!tenant) {
                return res.status(404).json({ message: 'Tenant not found' });
            }
            res.json(tenant);
        }
        catch (error) {
            console.error('Error fetching tenant:', error);
            res.status(500).json({ message: 'Error fetching tenant' });
        }
    }
    // Create tenant
    async createTenant(req, res) {
        try {
            const tenant = new Tenant_1.default(req.body);
            await tenant.save();
            res.status(201).json(tenant);
        }
        catch (error) {
            console.error('Error creating tenant:', error);
            res.status(500).json({ message: 'Error creating tenant' });
        }
    }
    // Update tenant
    async updateTenant(req, res) {
        try {
            const tenant = await Tenant_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!tenant) {
                return res.status(404).json({ message: 'Tenant not found' });
            }
            res.json(tenant);
        }
        catch (error) {
            console.error('Error updating tenant:', error);
            res.status(500).json({ message: 'Error updating tenant' });
        }
    }
    // Delete tenant
    async deleteTenant(req, res) {
        try {
            const tenant = await Tenant_1.default.findByIdAndDelete(req.params.id);
            if (!tenant) {
                return res.status(404).json({ message: 'Tenant not found' });
            }
            res.json({ message: 'Tenant deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting tenant:', error);
            res.status(500).json({ message: 'Error deleting tenant' });
        }
    }
    // Get tenant payments
    async getTenantPayments(req, res) {
        try {
            const payments = await Payment_1.default.find({ tenantId: req.params.id })
                .sort({ paymentDate: -1 });
            res.json(payments);
        }
        catch (error) {
            console.error('Error fetching tenant payments:', error);
            res.status(500).json({ message: 'Error fetching tenant payments' });
        }
    }
    // Get tenant maintenance requests
    async getTenantMaintenance(req, res) {
        try {
            const maintenance = await Maintenance_1.default.find({ tenantId: req.params.id })
                .sort({ createdAt: -1 });
            res.json(maintenance);
        }
        catch (error) {
            console.error('Error fetching tenant maintenance:', error);
            res.status(500).json({ message: 'Error fetching tenant maintenance' });
        }
    }
    // Record payment
    async recordPayment(req, res) {
        try {
            const { amount, paymentDate, paymentMethod, notes } = req.body;
            const payment = new Payment_1.default({
                tenantId: req.params.id,
                amount,
                paymentDate,
                paymentMethod,
                notes
            });
            await payment.save();
            res.status(201).json(payment);
        }
        catch (error) {
            console.error('Error recording payment:', error);
            res.status(500).json({ message: 'Error recording payment' });
        }
    }
}
exports.TenantController = TenantController;
