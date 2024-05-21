import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../model/User';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without specifying _id
    const newUser = new User({ username, password: hashedPassword });

    // Save new user to the database (MongoDB will automatically generate _id)
    await newUser.save();

    // Generate JWT token using userId from newUser._id
    const jwtSecret: Secret = process.env.JWT_SECRET ?? ''; // Provide a default value if process.env.JWT_SECRET is undefined
    const token = jwt.sign({ userId: newUser._id.toString() }, jwtSecret); // Convert _id to string
    res.status(201).json({ token });
    console.log(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
