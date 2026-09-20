import express from "express";
import { signup , login ,Me} from "../controllers/auth.controller.js";
import Authorize from "../middleware/authorize.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", Authorize,Me);



export default router;

