"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../models/settings"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
const SECRET = process.env.SECRET;
if (!SECRET) {
    throw new Error('JWT SECRET environment variable is not set');
}
// Signup
router.post('/signup', async (req, res) => {
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
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        // Hash password and create user
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await user_1.default.create({
            email,
            password: passwordHash,
        });
        const settings = new settings_1.default({ userId: user._id });
        await settings.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                // Add other non-sensitive fields as needed
            }
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'No account with this email' });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email
        }, SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Validate Token
router.post('/validate-token', (req, res) => {
    const { token } = req.body;
    jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false });
        }
        // decoded contains the payload, e.g., { userId, email, iat, exp }
        return res.status(200).json({ valid: true, userId: decoded?.userId });
    });
});
exports.authRouter = router;
