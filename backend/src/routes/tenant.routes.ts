import express from 'express';
import Tenant from '../models/Tenant';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Get all tenants
router.get('/', auth, async (req: any, res) => {
  try {
    const tenants = await Tenant.find()
      .populate('property', 'name address')
      .sort({ createdAt: -1 });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants' });
  }
});

// Get single tenant
router.get('/:id', auth, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate('property', 'name address');
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenant' });
  }
});

// Create tenant
router.post('/', auth, async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tenant' });
  }
});

// Update tenant
router.put('/:id', auth, async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('property', 'name address');
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tenant' });
  }
});

// Delete tenant
router.delete('/:id', auth, async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tenant' });
  }
});

// Get tenants by property
router.get('/property/:propertyId', auth, async (req, res) => {
  try {
    const tenants = await Tenant.find({ property: req.params.propertyId })
      .populate('property', 'name address')
      .sort({ createdAt: -1 });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants' });
  }
});

export default router; 