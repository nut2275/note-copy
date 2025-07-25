import express from 'express';
import {getNote, getFolder, 
    createFolder, createNote, 
    deleteFolder, deleteNote,
    updateFolder, updateNote
} from '../controllers/note.controller'

const router = express.Router();

// notes?folderId=${folderId}`
router.get('/folders/:folderId/notes', getNote); //note
router.get('/folders', getFolder);

router.post('/folder', createFolder);
router.post('/note', createNote);

router.put('/folder/:id', updateFolder);
router.put('/note/:id', updateNote);

router.delete('/folder/:id', deleteFolder);
router.delete('/note/:id', deleteNote);


export default router;