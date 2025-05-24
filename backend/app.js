import express from 'express';
import cors from 'cors';
import { QuestionRouter } from './routes/questions.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/questions', QuestionRouter);

export default app;