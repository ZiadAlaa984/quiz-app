import Question from "../models/question.model.js";
import Quiz from "../models/quiz.model.js";
import Result from "../models/result.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Factory from "../utils/factory.js";

const quizFactory = new Factory(Quiz);

const getAllquizs = quizFactory.getAll;
const getquiz = quizFactory.getOne;
const createquiz = quizFactory.createOne;
const updatequiz = quizFactory.updateOne;
const deletequiz = quizFactory.deleteOne;

const submitQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.params.id;
  const { quizResult } = req.body; // [{ questionId, selectedAnswer }, ...]

  // Get Quiz
  const quiz = await Quiz.findById(quizId);
  if (!quiz) return next(new AppError('No quiz found with this id', 404));

  if (!Array.isArray(quizResult) || quizResult.length === 0) {
    return next(new AppError('quizResult must be a non-empty array', 400));
  }

  // Get Questions (answer has select:false, so explicitly request it)
  const questionIds = quizResult.map((q) => q.questionId);
  const questions = await Question.find({
    _id: { $in: questionIds },
    quiz: quizId,
  }).select('+answer');

  if (questions.length === 0) {
    return next(new AppError('No matching questions found for this quiz', 404));
  }

  // Get correct answers -> lookup map
  const answerMap = new Map(questions.map((q) => [q._id.toString(), q.answer]));

  // Compare user's answers & calculate score
  let score = 0;
  const details = quizResult.map((item) => {
    const correctAnswer = answerMap.get(item.questionId);
    const isCorrect = correctAnswer !== undefined && correctAnswer === item.selectedAnswer;
    if (isCorrect) score += 1;

    return {
      question: item.questionId,
      selectedAnswer: item.selectedAnswer,
      correctAnswer,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;
  const percentage = Number(((score / totalQuestions) * 100).toFixed(2));

  // Create Result
  const result = await Result.create({
    quiz: quizId,
    user: req.user?._id, // requires auth middleware to set req.user
    score,
    totalQuestions,
    percentage,
    details,
  });

  // Return Result
  res.status(201).json({
    status: 'success',
    data: { result },
  });
});


export default { getAllquizs, getquiz, createquiz, updatequiz, deletequiz , submitQuiz };