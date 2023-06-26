require('dotenv').config()
import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import apiRouter from './routes/api';
const dotenv = require("dotenv");

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

app.use("/", apiRouter);

const port = process.env.PORT || 3003;

export const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });

export default app;