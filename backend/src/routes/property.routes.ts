import express from 'express';
import Property from '../models/Property';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Get all properties
router.get('/', auth, async (req: any, res) => {
  try {
    const properties = await Property.find({ manager: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// Get single property
router.get('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property' });
  }
});

// Create property
router.post('/', auth, async (req: any, res) => {
  try {
    const property = new Property({
      ...req.body,
      manager: req.user._id,
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
});

// Update property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property' });
  }
});

// Delete property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
});

export default router; 