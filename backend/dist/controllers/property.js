"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const Property_1 = __importDefault(require("../models/Property"));
const express_validator_1 = require("express-validator");
class PropertyController {
    constructor() {
        this.getAllProperties = async (req, res) => {
            try {
                const properties = await Property_1.default.find({ owner: req.user.id });
                res.status(200).json(properties);
            }
            catch (error) {
                console.error('Error fetching properties:', error);
                res.status(500).json({ message: 'Failed to retrieve properties', error: error.message });
            }
        };
        this.getPropertyById = async (req, res) => {
            try {
                const property = await Property_1.default.findById(req.params.id);
                if (!property) {
                    return res.status(404).json({ message: 'Property not found' });
                }
                // Ensure the user owns the property
                if (property.owner.toString() !== req.user.id) {
                    return res.status(403).json({ message: 'Unauthorized access to property' });
                }
                res.status(200).json(property);
            }
            catch (error) {
                console.error('Error fetching property by ID:', error);
                res.status(500).json({ message: 'Failed to retrieve property', error: error.message });
            }
        };
        this.createProperty = async (req, res) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const newProperty = new Property_1.default({ ...req.body, owner: req.user.id });
                await newProperty.save();
                res.status(201).json(newProperty);
            }
            catch (error) {
                console.error('Error creating property:', error);
                res.status(500).json({ message: 'Failed to create property', error: error.message });
            }
        };
        this.updateProperty = async (req, res) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const property = await Property_1.default.findById(req.params.id);
                if (!property) {
                    return res.status(404).json({ message: 'Property not found' });
                }
                // Ensure the user owns the property
                if (property.owner.toString() !== req.user.id) {
                    return res.status(403).json({ message: 'Unauthorized access to property' });
                }
                const updatedProperty = await Property_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                res.status(200).json(updatedProperty);
            }
            catch (error) {
                console.error('Error updating property:', error);
                res.status(500).json({ message: 'Failed to update property', error: error.message });
            }
        };
        this.deleteProperty = async (req, res) => {
            try {
                const property = await Property_1.default.findById(req.params.id);
                if (!property) {
                    return res.status(404).json({ message: 'Property not found' });
                }
                // Ensure the user owns the property
                if (property.owner.toString() !== req.user.id) {
                    return res.status(403).json({ message: 'Unauthorized access to property' });
                }
                await Property_1.default.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'Property deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting property:', error);
                res.status(500).json({ message: 'Failed to delete property', error: error.message });
            }
        };
        // Stubs for other methods (can be implemented later if needed)
        this.getPropertyStats = async (req, res) => {
            res.status(200).json({ message: 'getPropertyStats stub' });
        };
        this.getPropertyTenants = async (req, res) => {
            res.status(200).json({ message: 'getPropertyTenants stub' });
        };
        this.getPropertyMaintenance = async (req, res) => {
            res.status(200).json({ message: 'getPropertyMaintenance stub' });
        };
    }
}
exports.PropertyController = PropertyController;
