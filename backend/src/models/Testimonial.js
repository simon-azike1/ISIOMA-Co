import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

testimonialSchema.index({ order: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;