"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Property_1 = __importDefault(require("../models/Property"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all properties
router.get('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const properties = await Property_1.default.find({ manager: req.user._id });
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
});
// Get single property
router.get('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const property = await Property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching property' });
    }
});
// Create property
router.post('/', auth_middleware_1.auth, async (req, res) => {
    try {
        const property = new Property_1.default({
            ...req.body,
            manager: req.user._id,
        });
        await property.save();
        res.status(201).json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating property' });
    }
});
// Update property
router.put('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const property = await Property_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating property' });
    }
});
// Delete property
router.delete('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const property = await Property_1.default.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting property' });
    }
});
exports.default = router;
