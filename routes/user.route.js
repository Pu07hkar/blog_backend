import { register, login, postBlog , logout} from "../controllers/user.controller.js";
import { Router } from "express";
import authorization from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/postBlog/:_id").post(postBlog);
router.route("/logout").post(authorization, logout);
export default router;