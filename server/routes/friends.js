import express from 'express';

import { searchByUsername } from '../controllers/friends.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search/:username', auth, searchByUsername);

export default router;