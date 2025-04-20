import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
const router = express.Router();

const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error('JWT SECRET environment variable is not set');
}

// Signup
router.post('/signup', async (req: AuthRequest, res: Response) => {
	const { email, password } = req.body;

	// Input validation
	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	if (password.length < 6) {
		return res.status(400).json({ error: 'Password must be at least 6 characters long' });
	}

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already registered' });
		}

		// Hash password and create user
		const passwordHash = await bcrypt.hash(password, 10);
		await User.create({
			email,
			password: passwordHash,
		});

		res.status(201).json({ message: 'Account created successfully' });
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Login
router.post('/login', async (req: AuthRequest, res: Response) => {
	const { email, password } = req.body;

	// Input validation
	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ 
				userId: user._id,
				email: user.email
			},
			SECRET,
			{ expiresIn: '1h' }
		);

		res.json({ 
			token,
			user: {
				id: user._id,
				email: user.email
			}
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
})

export const authRouter = router;