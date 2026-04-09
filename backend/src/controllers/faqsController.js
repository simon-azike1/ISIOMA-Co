import FAQ from '../models/FAQ.js';
import { body, validationResult } from 'express-validator';

export const getFaqs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const createFaqValidation = [
  body('question').trim().notEmpty(),
  body('answer').trim().notEmpty()
];

export const createFaq = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { question, answer, category, order, isActive } = req.body;
    const faq = await FAQ.create({ question, answer, category, order, isActive });
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaqValidation = [
  body('question').optional().trim().notEmpty(),
  body('answer').optional().trim().notEmpty()
];

export const updateFaq = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { question, answer, category, order, isActive } = req.body;
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer, category, order, isActive },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    res.json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};