import {
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import NotFoundError from "../errors/not-found-error";

const router = Router();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Page Not Found!"));
});

export default router;
