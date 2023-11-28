import { Router } from "express";
import { loginUser, createUser } from "../controllers/users";
import { validateSignIn, validateUser } from "../middlewares/validators";

const authRouter = Router();

authRouter.post("/signin", validateSignIn, loginUser);
authRouter.post("/signup", validateUser, createUser);

export default authRouter;
