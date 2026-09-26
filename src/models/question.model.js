import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
    answer: {
    type: String,
    required: true,
    select: false
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;