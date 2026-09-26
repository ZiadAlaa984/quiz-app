import Question from "../models/question.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Factory from "../utils/factory.js";
import Quiz from "../models/quiz.model.js"
const questionFactory = new Factory(Question);

const getAllQuestions = questionFactory.getAll;
const getQuestion = questionFactory.getOne;

const createQuestion = catchAsync(async (req, res) => {
  const quizId = req.params.id;

  if (!quizId) throw new AppError("Quiz id not provided", 400);

  const quiz = await Quiz.findById(quizId);

  if (!quiz) throw new AppError("Quiz does not exist", 404);

  const doc = await Question.create({ ...req.body, quiz: quizId });

  await Quiz.findByIdAndUpdate(quizId, {
    $push: { questions: doc._id },
  });

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
});
const updateQuestion = questionFactory.updateOne;
const deleteQuestion = questionFactory.deleteOne;


export default { getAllQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion };