import express from 'express';

import { rateUrl } from '../controllers/ratings.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.patch('/url', auth, rateUrl);

export default router;