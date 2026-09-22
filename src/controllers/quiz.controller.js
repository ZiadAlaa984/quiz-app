import Quiz from "../models/quiz.model.js";
import Factory from "../utils/factory.js";

const quizFactory = new Factory(Quiz);

const getAllquizs = quizFactory.getAll;
const getquiz = quizFactory.getOne;
const createquiz = quizFactory.createOne;
const updatequiz = quizFactory.updateOne;
const deletequiz = quizFactory.deleteOne;


export default { getAllquizs, getquiz, createquiz, updatequiz, deletequiz };