import { Response } from 'express';
import Property, { IProperty } from '../models/Property';
import { body, validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';

export class PropertyController {
  getAllProperties = async (req: AuthRequest, res: Response) => {
    try {
      const properties: IProperty[] = await Property.find();
      res.status(200).json(properties);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ message: 'Failed to retrieve properties', error: error.message });
    }
  };

  getPropertyById = async (req: AuthRequest, res: Response) => {
    try {
      const property: IProperty | null = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      // Ensure the user owns the property
      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized access to property' });
      }
      res.status(200).json(property);
    } catch (error: any) {
      console.error('Error fetching property by ID:', error);
      res.status(500).json({ message: 'Failed to retrieve property', error: error.message });
    }
  };

  createProperty = async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProperty: IProperty = new Property({ ...req.body, owner: req.user.id });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error: any) {
      console.error('Error creating property:', error);
      res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
  };

  updateProperty = async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const property: IProperty | null = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      // Ensure the user owns the property
      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized access to property' });
      }

      const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.status(200).json(updatedProperty);
    } catch (error: any) {
      console.error('Error updating property:', error);
      res.status(500).json({ message: 'Failed to update property', error: error.message });
    }
  };

  deleteProperty = async (req: AuthRequest, res: Response) => {
    try {
      const property: IProperty | null = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      // Ensure the user owns the property
      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized access to property' });
      }
      await Property.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting property:', error);
      res.status(500).json({ message: 'Failed to delete property', error: error.message });
    }
  };

  // Stubs for other methods (can be implemented later if needed)
  getPropertyStats = async (req: AuthRequest, res: Response) => {
    res.status(200).json({ message: 'getPropertyStats stub' });
  };

  getPropertyTenants = async (req: AuthRequest, res: Response) => {
    res.status(200).json({ message: 'getPropertyTenants stub' });
  };

  getPropertyMaintenance = async (req: AuthRequest, res: Response) => {
    res.status(200).json({ message: 'getPropertyMaintenance stub' });
  };
} 