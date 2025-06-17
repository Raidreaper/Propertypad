"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Maintenance_1 = __importDefault(require("../models/Maintenance"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all maintenance requests
router.get('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.find()
            .populate('property', 'name address')
            .populate('tenant', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance requests' });
    }
});
// Get single maintenance request
router.get('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.findById(req.params.id)
            .populate('property', 'name address')
            .populate('tenant', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName');
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance request' });
    }
});
// Create maintenance request
router.post('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = new Maintenance_1.default(req.body);
        await maintenance.save();
        res.status(201).json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating maintenance request' });
    }
});
// Update maintenance request
router.put('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('property', 'name address')
            .populate('tenant', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName');
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating maintenance request' });
    }
});
// Delete maintenance request
router.delete('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.findByIdAndDelete(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        res.json({ message: 'Maintenance request deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting maintenance request' });
    }
});
// Get maintenance requests by property
router.get('/property/:propertyId', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.find({ property: req.params.propertyId })
            .populate('property', 'name address')
            .populate('tenant', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance requests' });
    }
});
// Get maintenance requests by status
router.get('/status/:status', auth_middleware_1.auth, async (req, res) => {
    try {
        const maintenance = await Maintenance_1.default.find({ status: req.params.status })
            .populate('property', 'name address')
            .populate('tenant', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance requests' });
    }
});
exports.default = router;
