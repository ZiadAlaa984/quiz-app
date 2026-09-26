import express from "express";
import questionController from "../controllers/question.controller.js";
import authenticated from "../middleware/authenticated.js";
import authorized from "../middleware/authorized.js";
const router = express.Router();
const { createQuestion, deleteQuestion, getAllQuestions, getQuestion, updateQuestion } = questionController;

router.use(authenticated);

router.route("/").get(getAllQuestions)
router.route("/:id").post( authorized("admin"),createQuestion).get(getQuestion).patch( authorized("admin"),updateQuestion).delete(authorized("admin"),deleteQuestion);


export default router;