import express from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  createTestimonialValidation,
  updateTestimonialValidation 
} from '../controllers/testimonialsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);

router.post('/', authMiddleware, createTestimonialValidation, createTestimonial);
router.put('/:id', authMiddleware, updateTestimonialValidation, updateTestimonial);
router.delete('/:id', authMiddleware, deleteTestimonial);

export default router;