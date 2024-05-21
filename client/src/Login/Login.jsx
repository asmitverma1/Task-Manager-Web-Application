import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import common CSS file for authentication forms
import Todo from '../Todo/Todo';

function Login() {
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            setUserId(response.data.userId);
            console.log(response);
            sessionStorage.setItem('userId', response.data.userId);
        } catch (error) {
            console.log(error);
            // Handle login error (display error message, clear form fields, etc.)
        }
    };

    const handleLogout = () => {
        setUserId('');
        sessionStorage.removeItem('userId');
    };

    return (
        <div className="auth-container">
            {userId ? (
                <div>
                    <h2>Welcome, User!</h2>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    <Todo userId={userId} />
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
