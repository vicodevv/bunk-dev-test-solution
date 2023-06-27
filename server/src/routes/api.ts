import express from 'express';
import expenseRouter from './expense.routes';

const apiRouter = express.Router();

apiRouter.use('/expense', expenseRouter);

export default apiRouter;
