import { Router } from 'express';
import authRoutes from './auth';
import propertyRoutes from './properties';
import tenantRoutes from './tenants';
import maintenanceRoutes from './maintenance';
import userRoutes from './users';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/tenants', tenantRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/users', userRoutes);

export default router; 