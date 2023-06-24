import express from "express";
import expenseController from "../controllers/expense.controller";

const expenseRouter = express.Router();

expenseRouter.post("/add", expenseController.add);

export default expenseRouter;