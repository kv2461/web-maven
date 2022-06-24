import express from 'express';

import { createNewFolder, sendViewerRequest, sendEditorRequest, getFolders } from '../controllers/folders.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createNew', auth, createNewFolder);

router.post('/sendEditorReq', auth, sendEditorRequest);

router.post('/sendViewerReq', auth, sendViewerRequest);

router.get('/get', auth, getFolders);

export default router;