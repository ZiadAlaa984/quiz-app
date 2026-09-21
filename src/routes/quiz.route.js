import express from "express";
import { createquiz, deletequiz, getquiz, getquizzes, updatequiz } from "../controllers/quiz.controller.js";
import authenticated from "../middleware/authenticated.js";
import authorized from "../middleware/authorized.js";

const router = express.Router();

router.use(authenticated); // Apply authentication middleware to all routes

router.route("/").get(getquizzes).post(authorized(["admin"]),createquiz);
router.route('/:id')
  .get(getquiz)
  .patch(authorized(["admin"]), updatequiz)
  .delete(authorized(["admin"]), deletequiz);


export default router;