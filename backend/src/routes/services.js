import express from 'express';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService,
  reorderService,
  createServiceValidation,
  updateServiceValidation 
} from '../controllers/servicesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getServices);

router.post('/', authMiddleware, createServiceValidation, createService);
router.put('/:id', authMiddleware, updateServiceValidation, updateService);
router.delete('/:id', authMiddleware, deleteService);
router.patch('/:id/reorder', authMiddleware, reorderService);

export default router;