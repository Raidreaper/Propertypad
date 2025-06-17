import { Request, Response } from 'express';
import User from '../models/User';

export class UserController {
  // Get user profile
  async getProfile(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching user profile' });
    }
  }

  // Update user profile
  async updateProfile(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, phone, company, address } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { firstName, lastName, email, phone, company, address },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  }

  // Update user settings
  async updateSettings(req: Request, res: Response) {
    try {
      const { notifications, theme, language, timezone } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { settings: { notifications, theme, language, timezone } },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error updating user settings:', error);
      res.status(500).json({ message: 'Error updating user settings' });
    }
  }

  // Get user notifications
  async getNotifications(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id)
        .select('notifications')
        .populate('notifications');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  }

  // Mark notification as read
  async markNotificationAsRead(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const notification = user.notifications.id(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      notification.read = true;
      await user.save();
      res.json(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Error marking notification as read' });
    }
  }

  // Delete notification
  async deleteNotification(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.notifications = user.notifications.filter(
        (notification) => notification._id.toString() !== req.params.id
      );
      await user.save();
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ message: 'Error deleting notification' });
    }
  }

  // Get user activity log
  async getActivityLog(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id)
        .select('activityLog')
        .populate('activityLog');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.activityLog);
    } catch (error) {
      console.error('Error fetching activity log:', error);
      res.status(500).json({ message: 'Error fetching activity log' });
    }
  }
} 