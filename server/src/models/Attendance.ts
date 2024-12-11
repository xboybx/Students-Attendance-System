import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  batchId: {
    type: String,
    required: true
  },
  present: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});