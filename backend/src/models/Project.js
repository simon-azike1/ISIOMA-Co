import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  year: {
    type: Number
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;