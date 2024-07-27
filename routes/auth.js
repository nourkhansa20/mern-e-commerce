// authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/User.js';
import authenticateJWT from '../middleware/authMiddleware.js'

const router = express.Router();
const secretKey = 'your_jwt_secret_key'; // Use a strong secret key in production

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate({
      path: 'addresses',
      match: { deleted: 0 }
    });;

    if (!user) {
      return res.status(401).send('No user with that username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Password incorrect');
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

    res.json({ message: 'Authenticated', token, user });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/validate-token', authenticateJWT, (req, res) => {
  res.send({ message: "ddd" })
});

export default router;
