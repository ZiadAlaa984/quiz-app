import Question from "../models/question.model.js";
import Factory from "../utils/factory.js";

const questionFactory = new Factory(Question);

const getAllQuestions = questionFactory.getAll;
const getQuestion = questionFactory.getOne;
const createQuestion = questionFactory.createOne;
const updateQuestion = questionFactory.updateOne;
const deleteQuestion = questionFactory.deleteOne;


export default { getAllQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion };