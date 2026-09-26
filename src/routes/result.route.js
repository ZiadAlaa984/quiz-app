import express from "express";
import authenticated from "../middleware/authenticated.js";
import authorized from "../middleware/authorized.js";
import resultController from "../controllers/result.controller.js";

const router = express.Router();
const {getAllResults, getResult, createResult, updateResult, deleteResult } = resultController;

router.use(authenticated); // Apply authentication middleware to all routes

router.route("/").get(authorized(["admin"]),getAllResults).post(authorized(["admin"]),createResult);
router.route('/:id')
  .get(getResult)
  .patch(authorized(["admin"]), updateResult)
  .delete(authorized(["admin"]), deleteResult);


export default router;