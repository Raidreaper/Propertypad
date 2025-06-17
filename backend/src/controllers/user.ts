import { Request, Response } from 'express';

export class UserController {
  getUserProfile = async (req: Request, res: Response) => {
    res.json({ message: 'getUserProfile stub' });
  };
  updateUserProfile = async (req: Request, res: Response) => {
    res.json({ message: 'updateUserProfile stub' });
  };
  updateUserSettings = async (req: Request, res: Response) => {
    res.json({ message: 'updateUserSettings stub' });
  };
  getUserNotifications = async (req: Request, res: Response) => {
    res.json({ message: 'getUserNotifications stub' });
  };
  markNotificationAsRead = async (req: Request, res: Response) => {
    res.json({ message: 'markNotificationAsRead stub' });
  };
  deleteNotification = async (req: Request, res: Response) => {
    res.json({ message: 'deleteNotification stub' });
  };
  getUserActivity = async (req: Request, res: Response) => {
    res.json({ message: 'getUserActivity stub' });
  };
} 