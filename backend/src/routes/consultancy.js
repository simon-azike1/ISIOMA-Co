import express from 'express';
import { 
  getConsultancy, 
  getAllActiveConsultancy,
  getAllConsultancy, 
  createConsultancy, 
  updateConsultancy, 
  deleteConsultancy,
  createConsultancyValidation,
  updateConsultancyValidation 
} from '../controllers/consultancyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getConsultancy);
router.get('/all-active', getAllActiveConsultancy);
router.get('/all', authMiddleware, getAllConsultancy);

router.post('/', authMiddleware, createConsultancyValidation, createConsultancy);
router.put('/:id', authMiddleware, updateConsultancyValidation, updateConsultancy);
router.delete('/:id', authMiddleware, deleteConsultancy);

export default router;