import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'

import authenticateJWT from './middleware/authMiddleware.js'
import passport from './config/passport-config.js'; // Correct the path

import authRoutes from './routes/auth.js'; // Correct the path

import './database/database.js'

dotenv.config()

// Resolving dirnanme for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

//midleware for passport js
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/auth', authRoutes); // Use the auth routes

// Use the Client app
app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

// Render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log("Server run at port 3000")
})