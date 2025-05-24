import { getQuestions } from "../controllers/questions.controllers.js";
import express from "express";

const router = express.Router();

router.post("/get-questions", getQuestions);

export const QuestionRouter = router;