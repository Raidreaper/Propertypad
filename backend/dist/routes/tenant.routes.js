"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tenant_1 = __importDefault(require("../models/Tenant"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all tenants
router.get('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenants = await Tenant_1.default.find()
            .populate('property', 'name address')
            .sort({ createdAt: -1 });
        res.json(tenants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tenants' });
    }
});
// Get single tenant
router.get('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenant = await Tenant_1.default.findById(req.params.id).populate('property', 'name address');
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(tenant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tenant' });
    }
});
// Create tenant
router.post('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenant = new Tenant_1.default(req.body);
        await tenant.save();
        res.status(201).json(tenant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating tenant' });
    }
});
// Update tenant
router.put('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenant = await Tenant_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('property', 'name address');
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(tenant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating tenant' });
    }
});
// Delete tenant
router.delete('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenant = await Tenant_1.default.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json({ message: 'Tenant deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting tenant' });
    }
});
// Get tenants by property
router.get('/property/:propertyId', auth_middleware_1.auth, async (req, res) => {
    try {
        const tenants = await Tenant_1.default.find({ property: req.params.propertyId })
            .populate('property', 'name address')
            .sort({ createdAt: -1 });
        res.json(tenants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tenants' });
    }
});
exports.default = router;
