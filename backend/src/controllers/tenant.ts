import { Request, Response } from 'express';

export class TenantController {
  getAllTenants = async (req: Request, res: Response) => {
    res.json({ message: 'getAllTenants stub' });
  };
  getTenantById = async (req: Request, res: Response) => {
    res.json({ message: 'getTenantById stub' });
  };
  createTenant = async (req: Request, res: Response) => {
    res.json({ message: 'createTenant stub' });
  };
  updateTenant = async (req: Request, res: Response) => {
    res.json({ message: 'updateTenant stub' });
  };
  deleteTenant = async (req: Request, res: Response) => {
    res.json({ message: 'deleteTenant stub' });
  };
  getTenantPayments = async (req: Request, res: Response) => {
    res.json({ message: 'getTenantPayments stub' });
  };
  getTenantMaintenance = async (req: Request, res: Response) => {
    res.json({ message: 'getTenantMaintenance stub' });
  };
  recordPayment = async (req: Request, res: Response) => {
    res.json({ message: 'recordPayment stub' });
  };
} 