import express from "express";
import authenticated from "../middleware/authenticated.js";
import authorized from "../middleware/authorized.js";
import resultController from "../controllers/result.controller.js";

const router = express.Router();
const {getAllResults, getResult } = resultController;

router.use(authenticated); // Apply authentication middleware to all routes

router.route("/").get(authorized(["admin"]),getAllResults)
router.route('/:id')
  .get(getResult)


export default router;