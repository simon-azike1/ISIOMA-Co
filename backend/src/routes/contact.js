import express from 'express';
import { 
  submitMessage, 
  getMessages, 
  markAsRead, 
  deleteMessage,
  submitMessageValidation 
} from '../controllers/contactController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitMessageValidation, submitMessage);

router.get('/messages', authMiddleware, getMessages);
router.patch('/messages/:id/read', authMiddleware, markAsRead);
router.delete('/messages/:id', authMiddleware, deleteMessage);

export default router;