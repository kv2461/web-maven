import express from 'express';

import { searchByUsername, sendFriendRequest, getFriendStatus, getFriends, cancelFriendRequest, denyFriendRequest, searchById, acceptFriendRequest } from '../controllers/friends.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search/:username', auth, searchByUsername);

router.get('/searchById/:id', auth, searchById)

router.post('/request', auth, sendFriendRequest);

router.get('/status', auth, getFriendStatus);

router.get('/friends', auth, getFriends);

router.patch('/cancel', auth, cancelFriendRequest);

router.patch('/deny', auth, denyFriendRequest);

router.patch('/accept', auth, acceptFriendRequest);

export default router;