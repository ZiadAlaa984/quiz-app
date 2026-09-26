import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  category: {
    type: String,
    required: true},
    
    difficulty: {
        type: String, 
        required: true,
        enum: ["easy", "medium", "hard"]
    },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }]
});



const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;