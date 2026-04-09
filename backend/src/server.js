import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import testimonialsRoutes from './routes/testimonials.js';
import faqsRoutes from './routes/faqs.js';
import contactRoutes from './routes/contact.js';
import consultancyRoutes from './routes/consultancy.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(helmet({ 
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

const clientUrl = process.env.CLIENT_URL || 'https://isioma-co.vercel.app';
const allowedOrigins = clientUrl.split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      return callback(null, true);
    }
    // Allow if origin matches allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow localhost for development
    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/consultancy', consultancyRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Server failed to start:', error.message);
  process.exit(1);
});

export default app;