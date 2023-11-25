import { Router } from "express";
import { loginUser, createUser } from "../controllers/users";
import { validateUser } from "../middlewares/validators";

const authRouter = Router();

authRouter.post("/signin", validateUser, loginUser);
authRouter.post("/signup", validateUser, createUser);

export default authRouter;
