import express from "express";
import authenticated from "../middleware/authenticated.js";
import authorized from "../middleware/authorized.js";
import quizController from "../controllers/quiz.controller.js";

const router = express.Router();
const {getAllquizs, getquiz, createquiz, updatequiz, deletequiz , submitQuiz } = quizController;

router.use(authenticated); // Apply authentication middleware to all routes

router.route("/").get(getAllquizs).post(authorized(["admin"]),createquiz);

router.route('/:id/submit').post(submitQuiz);

router.route('/:id')
  .get(getquiz)
  .patch(authorized(["admin"]), updatequiz)
  .delete(authorized(["admin"]), deletequiz);


export default router;