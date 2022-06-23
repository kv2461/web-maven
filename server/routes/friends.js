import express from 'express';

import { searchByUsername, sendFriendRequest, getFriendStatus, cancelFriendRequest, denyFriendRequest, searchById } from '../controllers/friends.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search/:username', auth, searchByUsername);

router.get('/searchById/:id', auth, searchById)

router.post('/request', auth, sendFriendRequest);

router.get('/status', auth, getFriendStatus);

router.patch('/cancel', auth, cancelFriendRequest);

router.patch('/deny', auth, denyFriendRequest);

export default router;