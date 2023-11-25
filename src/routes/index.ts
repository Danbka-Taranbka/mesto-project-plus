import { Router, Request, Response, NextFunction } from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import authRouter from "./authentication";
import auth from "../middlewares/auth";
import NotFoundError from "../errors/not-found-error";

const router = Router();

router.use("/", authRouter);
router.use(auth);
router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Not found!"));
});

export default router;
