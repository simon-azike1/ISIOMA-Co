import mongoose from 'mongoose';

const consultancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Briefcase'
  },
  benefits: [{
    type: String
  }],
  process: [{
    step: Number,
    title: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Consultancy = mongoose.model('Consultancy', consultancySchema);
export default Consultancy;