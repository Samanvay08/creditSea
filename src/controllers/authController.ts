import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ Email not found in DB');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user);
    console.log('Entered password:', password);
    console.log('Stored (hashed) password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ Login successful, token generated');
    res.status(200).json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    console.error('💥 Error in login:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
