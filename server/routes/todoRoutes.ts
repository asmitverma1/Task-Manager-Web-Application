// routes/todoRoutes.ts
import express from 'express';
import { getTodos, createTodo } from '../controllers/todoController';

const router = express.Router();

router.route('/').get(getTodos);
// router.route('/create').post(createTodo); // Use a distinct route for creating todos

export default router;
