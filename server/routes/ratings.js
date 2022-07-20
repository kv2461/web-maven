import express from 'express';

import { rateUrl, getUrlRatings, submitReview, getReviewItem } from '../controllers/ratings.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.patch('/url', auth, rateUrl);

router.patch('/info', auth, getUrlRatings);

router.patch('/submitreview', auth, submitReview);

router.patch('/item', auth, getReviewItem);

export default router;