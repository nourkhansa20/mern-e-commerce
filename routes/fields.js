// routes/users.js
import express from 'express';
import { getFields } from '../controllers/fields.js';

const router = express.Router();

router.get('/:collection_name', getFields);

export default router;
