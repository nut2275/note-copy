"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const router = express_1.default.Router();
// notes?folderId=${folderId}`
router.get('/folders/:folderId/notes', note_controller_1.getNote); //note
router.get('/folders', note_controller_1.getFolder);
router.post('/folder', note_controller_1.createFolder);
router.post('/note', note_controller_1.createNote);
router.put('/folder/:id', note_controller_1.updateFolder);
router.put('/note/:id', note_controller_1.updateNote);
router.delete('/folder/:id', note_controller_1.deleteFolder);
router.delete('/note/:id', note_controller_1.deleteNote);
exports.default = router;
