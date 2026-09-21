import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true},
    
    difficulty: {
        type: String,
        required: true
    },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }]
});



const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;