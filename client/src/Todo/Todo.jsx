import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css'; // Import CSS file for Todo component styling

function Todo({ userId }) {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/todos/get', {
                params: { userId }
            });
            setTodos(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTask = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/todos/create", {
                task,
                userId
            });
            console.log(response.data.completed);
            setTask('');
            fetchData(); // Refresh the todo list after adding a new task
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/delete/${id}`);
            fetchData(); // Refresh the todo list after deleting a task
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/todos/update/${id}`);
            fetchData(); // Refresh the todo list after updating a task
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="add-todo">
                <input
                    type="text"
                    placeholder="Enter your Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleTask}>Add</button>
            </div>
            <div className="todo-list">
                {todos.length === 0 ? (
                    <h1>No Record</h1>
                ) : (
                    todos.map((todo) => (
                        <div key={todo._id} className="todo-item">
                        <button onClick={() => handleUpdate(todo._id)} className={todo.completed ? 'done' : 'not-done'}>
                           {todo.completed ? 'Completed' : 'Pending'}
                        </button>
                            <span className="task">{todo.task}</span>
                            <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Todo;
