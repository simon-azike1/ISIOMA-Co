import Project from '../models/Project.js';
import { body, validationResult } from 'express-validator';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProjectValidation = [
  body('title').trim().notEmpty(),
  body('category').trim().notEmpty(),
  body('description').trim().notEmpty()
];

export const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, category, description, tags, year, isVisible } = req.body;
    const project = await Project.create({ title, category, description, tags, year, isVisible });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProjectValidation = [
  body('title').optional().trim().notEmpty(),
  body('category').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty()
];

export const updateProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { title, category, description, tags, year, isVisible } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, category, description, tags, year, isVisible },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};