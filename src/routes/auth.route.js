import express from "express";
import { signup , login ,Me} from "../controllers/auth.controller.js";
import authenticated from "../middleware/authenticated.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticated, Me);



export default router;

