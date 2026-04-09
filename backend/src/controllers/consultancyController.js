import Consultancy from '../models/Consultancy.js';
import { body, validationResult } from 'express-validator';

export const getConsultancy = async (req, res, next) => {
  try {
    const consultancy = await Consultancy.findOne({ isActive: true });
    res.json({ success: true, data: consultancy });
  } catch (error) {
    next(error);
  }
};

export const getAllActiveConsultancy = async (req, res, next) => {
  try {
    const consultancies = await Consultancy.find({ isActive: true }).sort({ title: 1 });
    res.json({ success: true, data: consultancies });
  } catch (error) {
    next(error);
  }
};

export const getAllConsultancy = async (req, res, next) => {
  try {
    const consultancies = await Consultancy.find().sort({ createdAt: -1 });
    res.json({ success: true, data: consultancies });
  } catch (error) {
    next(error);
  }
};

export const createConsultancyValidation = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty()
];

export const createConsultancy = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, icon, benefits, process, isActive } = req.body;
    const consultancy = await Consultancy.create({ title, description, icon, benefits, process, isActive });
    res.status(201).json({ success: true, data: consultancy });
  } catch (error) {
    next(error);
  }
};

export const updateConsultancyValidation = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty()
];

export const updateConsultancy = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, icon, benefits, process, isActive } = req.body;
    const consultancy = await Consultancy.findByIdAndUpdate(
      req.params.id,
      { title, description, icon, benefits, process, isActive },
      { new: true, runValidators: true }
    );

    if (!consultancy) {
      return res.status(404).json({ success: false, message: 'Consultancy not found' });
    }

    res.json({ success: true, data: consultancy });
  } catch (error) {
    next(error);
  }
};

export const deleteConsultancy = async (req, res, next) => {
  try {
    const consultancy = await Consultancy.findByIdAndDelete(req.params.id);
    if (!consultancy) {
      return res.status(404).json({ success: false, message: 'Consultancy not found' });
    }
    res.json({ success: true, message: 'Consultancy deleted' });
  } catch (error) {
    next(error);
  }
};