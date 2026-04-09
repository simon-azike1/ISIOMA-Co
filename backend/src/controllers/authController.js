import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }).trim()
];

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);
    res.json({ success: true, data: { token, admin: { id: admin._id, email: admin.email, name: admin.name } } });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};