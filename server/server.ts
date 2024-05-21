// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import Todo from './model/Todo';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.get('/api/todos/get', async (req, res) => {
    const userId = req.query.userId;
    try {
        const todos = await Todo.find({ userId });
        res.json(todos);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/todos/create', async (req, res) => {
    const { userId, task } = req.body;
    try {
        const newTodo = await Todo.create({
            userId,
            task
        });
        res.json(newTodo);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/todos/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/todos/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed; // Toggle the completed status
        await todo.save();
        res.json({ message: 'Todo updated successfully', todo });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
