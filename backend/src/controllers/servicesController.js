import Service from '../models/Service.js';
import { body, validationResult } from 'express-validator';

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const createServiceValidation = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty()
];

export const createService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, icon, order, isActive } = req.body;
    const service = await Service.create({ title, description, icon, order, isActive });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const updateServiceValidation = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty()
];

export const updateService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, description, icon, order, isActive } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, icon, order, isActive },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

export const reorderService = async (req, res, next) => {
  try {
    const { order } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};