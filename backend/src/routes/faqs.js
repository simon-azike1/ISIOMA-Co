import express from 'express';
import { 
  getFaqs, 
  createFaq, 
  updateFaq, 
  deleteFaq,
  createFaqValidation,
  updateFaqValidation 
} from '../controllers/faqsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFaqs);

router.post('/', authMiddleware, createFaqValidation, createFaq);
router.put('/:id', authMiddleware, updateFaqValidation, updateFaq);
router.delete('/:id', authMiddleware, deleteFaq);

export default router;