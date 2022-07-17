import express from 'express';

import { rateUrl, getUrlRatings } from '../controllers/ratings.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.patch('/url', auth, rateUrl);

router.patch('/info', auth, getUrlRatings);

export default router;