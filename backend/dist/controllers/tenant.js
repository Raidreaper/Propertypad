"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
class TenantController {
    constructor() {
        this.getAllTenants = async (req, res) => {
            res.json({ message: 'getAllTenants stub' });
        };
        this.getTenantById = async (req, res) => {
            res.json({ message: 'getTenantById stub' });
        };
        this.createTenant = async (req, res) => {
            res.json({ message: 'createTenant stub' });
        };
        this.updateTenant = async (req, res) => {
            res.json({ message: 'updateTenant stub' });
        };
        this.deleteTenant = async (req, res) => {
            res.json({ message: 'deleteTenant stub' });
        };
        this.getTenantPayments = async (req, res) => {
            res.json({ message: 'getTenantPayments stub' });
        };
        this.getTenantMaintenance = async (req, res) => {
            res.json({ message: 'getTenantMaintenance stub' });
        };
        this.recordPayment = async (req, res) => {
            res.json({ message: 'recordPayment stub' });
        };
    }
}
exports.TenantController = TenantController;
