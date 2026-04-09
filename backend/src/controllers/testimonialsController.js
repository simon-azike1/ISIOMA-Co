import Testimonial from '../models/Testimonial.js';
import { body, validationResult } from 'express-validator';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isVisible: true }).sort({ order: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonialValidation = [
  body('name').trim().notEmpty(),
  body('role').trim().notEmpty(),
  body('company').trim().notEmpty(),
  body('quote').trim().notEmpty()
];

export const createTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, role, company, quote, order, isVisible } = req.body;
    const testimonial = await Testimonial.create({ name, role, company, quote, order, isVisible });
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonialValidation = [
  body('name').optional().trim().notEmpty(),
  body('role').optional().trim().notEmpty(),
  body('company').optional().trim().notEmpty(),
  body('quote').optional().trim().notEmpty()
];

export const updateTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, role, company, quote, order, isVisible } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, company, quote, order, isVisible },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};