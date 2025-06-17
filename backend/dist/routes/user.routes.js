"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all users (admin only)
router.get('/', auth_middleware_1.adminAuth, async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
// Get single user
router.get('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});
// Update user
router.put('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        // Only allow users to update their own profile unless they're admin
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }
        const updates = req.body;
        // Don't allow role updates unless user is admin
        if (updates.role && req.user.role !== 'admin') {
            delete updates.role;
        }
        const user = await User_1.default.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});
// Delete user
router.delete('/:id', auth_middleware_1.auth, async (req, res) => {
    try {
        // Only allow users to delete their own account unless they're admin
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this user' });
        }
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});
// Change password
router.post('/:id/change-password', auth_middleware_1.auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        // Only allow users to change their own password unless they're admin
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to change this user\'s password' });
        }
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify current password if not admin
        if (req.user.role !== 'admin') {
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error changing password' });
    }
});
exports.default = router;
