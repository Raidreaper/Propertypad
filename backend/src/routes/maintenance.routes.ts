import express from 'express';
import Maintenance from '../models/Maintenance';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Get all maintenance requests
router.get('/', auth, async (req: any, res) => {
  try {
    const maintenance = await Maintenance.find()
      .populate('property', 'name address')
      .populate('tenant', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests' });
  }
});

// Get single maintenance request
router.get('/:id', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id)
      .populate('property', 'name address')
      .populate('tenant', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName');
    
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance request' });
  }
});

// Create maintenance request
router.post('/', auth, async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating maintenance request' });
  }
});

// Update maintenance request
router.put('/:id', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('property', 'name address')
      .populate('tenant', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName');
    
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance request' });
  }
});

// Delete maintenance request
router.delete('/:id', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.json({ message: 'Maintenance request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maintenance request' });
  }
});

// Get maintenance requests by property
router.get('/property/:propertyId', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.find({ property: req.params.propertyId })
      .populate('property', 'name address')
      .populate('tenant', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests' });
  }
});

// Get maintenance requests by status
router.get('/status/:status', auth, async (req, res) => {
  try {
    const maintenance = await Maintenance.find({ status: req.params.status })
      .populate('property', 'name address')
      .populate('tenant', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests' });
  }
});

export default router; 