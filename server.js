import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'

import authenticateJWT from './middleware/authMiddleware.js'
import passport from './config/passport-config.js'; // Correct the path

import authRoutes from './routes/auth.js'; // Correct the path
import usersRoutes from './routes/users.js'; // Correct the path
import productsRoutes from './routes/products.js'; // Correct the path
import categoriesRoutes from './routes/categories.js'; // Correct the path
import fieldsRoutes from './routes/fields.js'; // Correct the path

import './database/database.js'

import { adminRouter, admin } from './adminjs/adminJS.js'

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

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/fields', fieldsRoutes);

// Use the Client app
app.use(express.static(path.join(__dirname, '/client/dist')))

// To access te images
app.use('/img', express.static(path.join(__dirname, 'public/images')));

// Use admin js
// app.use(admin.options.rootPath, adminRouter)

// Render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log("Server run at port 3000")
})