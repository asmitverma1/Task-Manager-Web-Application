import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../model/User';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const jwtSecret: Secret = process.env.JWT_SECRET ?? '';
    const token = jwt.sign({ userId: user._id }, jwtSecret);

    // Set the token as a cookie or response header
    res.cookie('token', token, { httpOnly: true }); // Set the token as a cookie (secure and HTTP-only recommended for production)
    res.setHeader('userId', user._id); // Set the user ID as a response heade
    console.log(req.headers);
    res.status(200).json({ userId: user._id }); // Send the user ID in the response body as well

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
