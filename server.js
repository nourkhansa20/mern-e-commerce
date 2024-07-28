import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import authenticateJWT from './middleware/authMiddleware.js';
import passport from './config/passport-config.js'; // Correct the path

import authRoutes from './routes/auth.js'; // Correct the path
import usersRoutes from './routes/users.js'; // Correct the path
import productsRoutes from './routes/products.js'; // Correct the path
import categoriesRoutes from './routes/categories.js'; // Correct the path
import fieldsRoutes from './routes/fields.js'; // Correct the path
import cartRoutes from './routes/cart.js'; // Correct the path
import addressRoutes from './routes/address.js'; // Correct the path
import orderRoutes from './routes/orders.js'; // Correct the path

import './database/database.js';

import { adminRouter, admin } from './adminjs/adminJS.js';

dotenv.config();

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware for passport.js
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/ecommerce/api/auth', authRoutes);
app.use('/ecommerce/api/users', usersRoutes);
app.use('/ecommerce/api/products', productsRoutes);
app.use('/ecommerce/api/categories', categoriesRoutes);
app.use('/ecommerce/api/fields', fieldsRoutes);
app.use('/ecommerce/api/cart', cartRoutes);
app.use('/ecommerce/api/addresses', addressRoutes);
app.use('/ecommerce/api/orders', orderRoutes);

// Use the Client app
app.use('/ecommerce', express.static(path.join(__dirname, 'client/dist')));

// To access the images
app.use('/images', express.static(path.join(__dirname, '/images')));

// Use admin js
// app.use(admin.options.rootPath, adminRouter);

// Render client for any path
app.get('/ecommerce/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
