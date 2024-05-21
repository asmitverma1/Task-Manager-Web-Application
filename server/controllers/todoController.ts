import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Todo from '../model/Todo';

// Define a custom interface that extends the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: { _id: string }; // Define the structure of the user property
}

// Controller to fetch all todos
export const getTodos = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Access the user ID from the request headers
    const userId = req.headers['user-id'] as string;

    // Fetch todos based on the user ID
    const todos = await Todo.find({ userId });

    // Send the todos as a JSON response
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Controller to create a todo
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Extract the task from the request body
    const { task } = req.body;


    // Create a new todo with the user ID and task
    const todo = await Todo.create({ task });

    // Send the created todo as a JSON response with status code 201
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
