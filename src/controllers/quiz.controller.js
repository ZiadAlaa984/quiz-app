import Quiz from "../models/quiz.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const getquizzes = catchAsync(async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
}); 
const createquiz = catchAsync(async (req, res) => {
  const newQuiz = await Quiz.create(req.body);
  res.status(201).json({
    message: "Quiz created successfully!",
    newQuiz
  });
});

const getquiz = catchAsync(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new AppError("Quiz not found", 404);
    }
    res.json({
        message: "Quiz found!",
        quiz
    });
});

const updatequiz = catchAsync(async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }
  res.json({
      message: "Quiz updated successfully!",
      quiz
  });
});

const deletequiz = catchAsync(async (req, res) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      throw new AppError("Quiz not found", 404);
    }
    res.json({
        message: "Quiz deleted successfully!"
    });

});


export { getquizzes, getquiz, updatequiz, deletequiz , createquiz };

