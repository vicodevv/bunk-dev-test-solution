
import express, { Request, Response } from "express";
import expenseRouter from "./expense.routes";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API." });
});

apiRouter.use("/expense", expenseRouter);


export default apiRouter;