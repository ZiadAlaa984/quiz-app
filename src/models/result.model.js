import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true
},
    score: {
    type: Number,
    required: true,
  },
    answers: {
    type: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
        answer: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
    }],
    default: [],
  },
},{
    timestamps: true,
});

const Result = mongoose.model('Result', resultSchema);
export default Result;