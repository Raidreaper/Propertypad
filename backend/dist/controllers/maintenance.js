"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceController = void 0;
class MaintenanceController {
    constructor() {
        this.getAllMaintenance = async (req, res) => {
            res.json({ message: 'getAllMaintenance stub' });
        };
        this.getMaintenanceById = async (req, res) => {
            res.json({ message: 'getMaintenanceById stub' });
        };
        this.createMaintenance = async (req, res) => {
            res.json({ message: 'createMaintenance stub' });
        };
        this.updateMaintenance = async (req, res) => {
            res.json({ message: 'updateMaintenance stub' });
        };
        this.deleteMaintenance = async (req, res) => {
            res.json({ message: 'deleteMaintenance stub' });
        };
        this.getMaintenanceRequestsByProperty = async (req, res) => {
            res.json({ message: 'getMaintenanceRequestsByProperty stub' });
        };
        this.getMaintenanceRequestsByTenant = async (req, res) => {
            res.json({ message: 'getMaintenanceRequestsByTenant stub' });
        };
        this.updateMaintenanceStatus = async (req, res) => {
            res.json({ message: 'updateMaintenanceStatus stub' });
        };
    }
}
exports.MaintenanceController = MaintenanceController;
