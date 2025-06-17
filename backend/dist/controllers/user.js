"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor() {
        this.getUserProfile = async (req, res) => {
            res.json({ message: 'getUserProfile stub' });
        };
        this.updateUserProfile = async (req, res) => {
            res.json({ message: 'updateUserProfile stub' });
        };
        this.updateUserSettings = async (req, res) => {
            res.json({ message: 'updateUserSettings stub' });
        };
        this.getUserNotifications = async (req, res) => {
            res.json({ message: 'getUserNotifications stub' });
        };
        this.markNotificationAsRead = async (req, res) => {
            res.json({ message: 'markNotificationAsRead stub' });
        };
        this.deleteNotification = async (req, res) => {
            res.json({ message: 'deleteNotification stub' });
        };
        this.getUserActivity = async (req, res) => {
            res.json({ message: 'getUserActivity stub' });
        };
    }
}
exports.UserController = UserController;
