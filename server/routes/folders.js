import express from 'express';

import { createNewFolder, sendViewerRequest, sendEditorRequest, getFolders, searchFolderById, addBookmark } from '../controllers/folders.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createNew', auth, createNewFolder);

router.post('/sendEditorReq', auth, sendEditorRequest);

router.post('/sendViewerReq', auth, sendViewerRequest);

router.get('/get', auth, getFolders);

router.get('/searchById/:id', auth, searchFolderById);

router.patch('/addBookmark', auth, addBookmark);

export default router;