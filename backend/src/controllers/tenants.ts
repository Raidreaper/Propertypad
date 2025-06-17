import { Response } from 'express';
import Tenant from '../models/Tenant';
import Payment from '../models/Payment';
import Maintenance from '../models/Maintenance';
import { AuthRequest } from '../middleware/auth';

export class TenantController {
  // Get all tenants
  async getAllTenants(req: AuthRequest, res: Response) {
    try {
      const tenants = await Tenant.find().populate('property');
      res.json(tenants);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      res.status(500).json({ message: 'Error fetching tenants' });
    }
  }

  // Get tenant by ID
  async getTenantById(req: AuthRequest, res: Response) {
    try {
      const tenant = await Tenant.findById(req.params.id).populate('property');
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      res.json(tenant);
    } catch (error) {
      console.error('Error fetching tenant:', error);
      res.status(500).json({ message: 'Error fetching tenant' });
    }
  }

  // Create tenant
  async createTenant(req: AuthRequest, res: Response) {
    try {
      const tenant = new Tenant(req.body);
      await tenant.save();
      res.status(201).json(tenant);
    } catch (error) {
      console.error('Error creating tenant:', error);
      res.status(500).json({ message: 'Error creating tenant' });
    }
  }

  // Update tenant
  async updateTenant(req: AuthRequest, res: Response) {
    try {
      const tenant = await Tenant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      res.json(tenant);
    } catch (error) {
      console.error('Error updating tenant:', error);
      res.status(500).json({ message: 'Error updating tenant' });
    }
  }

  // Delete tenant
  async deleteTenant(req: AuthRequest, res: Response) {
    try {
      const tenant = await Tenant.findByIdAndDelete(req.params.id);
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      res.json({ message: 'Tenant deleted successfully' });
    } catch (error) {
      console.error('Error deleting tenant:', error);
      res.status(500).json({ message: 'Error deleting tenant' });
    }
  }

  // Get tenant payments
  async getTenantPayments(req: AuthRequest, res: Response) {
    try {
      const payments = await Payment.find({ tenantId: req.params.id })
        .sort({ paymentDate: -1 });
      res.json(payments);
    } catch (error) {
      console.error('Error fetching tenant payments:', error);
      res.status(500).json({ message: 'Error fetching tenant payments' });
    }
  }

  // Get tenant maintenance requests
  async getTenantMaintenance(req: AuthRequest, res: Response) {
    try {
      const maintenance = await Maintenance.find({ tenantId: req.params.id })
        .sort({ createdAt: -1 });
      res.json(maintenance);
    } catch (error) {
      console.error('Error fetching tenant maintenance:', error);
      res.status(500).json({ message: 'Error fetching tenant maintenance' });
    }
  }

  // Record payment
  async recordPayment(req: AuthRequest, res: Response) {
    try {
      const { amount, paymentDate, paymentMethod, notes } = req.body;
      const payment = new Payment({
        tenantId: req.params.id,
        amount,
        paymentDate,
        paymentMethod,
        notes
      });
      await payment.save();
      res.status(201).json(payment);
    } catch (error) {
      console.error('Error recording payment:', error);
      res.status(500).json({ message: 'Error recording payment' });
    }
  }
} 