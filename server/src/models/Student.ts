import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});