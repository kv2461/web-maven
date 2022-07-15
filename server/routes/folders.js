import express from 'express';

import { createNewFolder, sendViewerRequest, sendEditorRequest, getFolders, searchFolderById, addBookmark, acceptBookmarkRequest, denyBookmarkRequest, removeFromBookmarkFolder, deleteBookmarkFolder, deleteBookmark, flagBookmark, unflagBookmark } from '../controllers/folders.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createNew', auth, createNewFolder);

router.patch('/delete', auth, deleteBookmarkFolder)

router.post('/sendEditorReq', auth, sendEditorRequest);

router.post('/sendViewerReq', auth, sendViewerRequest);

router.patch('/remove', auth, removeFromBookmarkFolder);

router.patch('/accept',auth, acceptBookmarkRequest)

router.patch('/deny', auth, denyBookmarkRequest)

router.get('/get', auth, getFolders);

router.get('/searchById/:id', auth, searchFolderById);

router.patch('/addBookmark', auth, addBookmark);

router.patch('/deleteBookmark', auth, deleteBookmark);

router.patch('/flagBookmark', auth, flagBookmark);

router.patch('/unflagBookmark', auth, unflagBookmark);





export default router;