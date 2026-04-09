import express from 'express';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  createProjectValidation,
  updateProjectValidation 
} from '../controllers/projectsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);

router.post('/', authMiddleware, createProjectValidation, createProject);
router.put('/:id', authMiddleware, updateProjectValidation, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;