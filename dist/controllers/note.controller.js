"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.updateFolder = exports.deleteNote = exports.deleteFolder = exports.createNote = exports.createFolder = exports.getFolder = exports.getNote = void 0;
const note_model_1 = require("../models/note.model");
const getNote = async (req, res) => {
    try {
        const notes = await note_model_1.Note.find({ folderId: req.params.folderId });
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get notes.' });
    }
};
exports.getNote = getNote;
const getFolder = async (req, res) => {
    try {
        const folders = await note_model_1.Folder.find();
        res.json(folders);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get folders.' });
    }
};
exports.getFolder = getFolder;
const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            res.status(400).json({ message: 'Folder name is required and cannot be empty.' });
            return;
        }
        const newFolder = new note_model_1.Folder({ name: name.trim() });
        await newFolder.save();
        res.status(201).json(newFolder);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create folder.' });
    }
};
exports.createFolder = createFolder;
const createNote = async (req, res) => {
    try {
        // const folderId: string = req.params.folderId;
        const { title, note, folderId } = req.body;
        if (!folderId || (!(title === null || title === void 0 ? void 0 : title.trim()) && !(note === null || note === void 0 ? void 0 : note.trim()))) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        const newNote = new note_model_1.Note({ folderId, title, note });
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create note.' });
    }
};
exports.createNote = createNote;
const deleteFolder = async (req, res) => {
    const folderId = req.params.id;
    try {
        // ✅ ลบโน้ตทั้งหมดใน folder นี้
        await note_model_1.Note.deleteMany({ folderId });
        //  ลบ folder
        const deletedFolder = await note_model_1.Folder.findByIdAndDelete(folderId);
        if (!deletedFolder) {
            res.status(404).json({ message: 'Folder not found.' });
            return;
        }
        res.status(200).json({ message: 'Folder deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.deleteFolder = deleteFolder;
const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        // ถ้าไม่มี id
        if (!noteId) {
            res.status(400).json({ message: 'Note ID is required' });
            return;
        }
        const deleted = await note_model_1.Note.findByIdAndDelete(noteId);
        if (!deleted) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.status(200).json({ message: 'Note deleted successfully', deleted });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete note' });
    }
};
exports.deleteNote = deleteNote;
const updateFolder = async (req, res) => {
    try {
        const folderId = req.params.id; // รับ id จาก URL parameter
        const { name } = req.body; // รับข้อมูลที่ต้องการอัพเดตจาก body
        // Validate ชื่อโฟลเดอร์
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            res.status(400).json({ message: 'Folder name is required and cannot be empty.' });
            return;
        }
        // update ด้วย findByIdAndUpdate พร้อม option { new: true } เพื่อคืนค่าอัพเดตล่าสุด
        const updatedFolder = await note_model_1.Folder.findByIdAndUpdate(folderId, { name: name.trim() }, { new: true });
        if (!updatedFolder) {
            res.status(404).json({ message: 'Folder not found.' });
            return;
        }
        res.status(200).json(updatedFolder);
    }
    catch (error) {
        console.error('Error updating folder:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.updateFolder = updateFolder;
const updateNote = async (req, res) => {
    try {
        const _id = req.params.id; // รับ id จาก URL param
        const { title, note } = req.body; // รับค่าที่ต้องการอัปเดต
        // หาโน้ตตาม id
        const existingNote = await note_model_1.Note.findById(_id);
        if (!existingNote) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        // อัปเดตค่า
        existingNote.title = title !== null && title !== void 0 ? title : existingNote.title;
        existingNote.note = note !== null && note !== void 0 ? note : existingNote.note;
        existingNote.updatedAt = new Date();
        // บันทึก
        const updatedNote = await existingNote.save();
        res.status(200).json(updatedNote);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update note' });
    }
};
exports.updateNote = updateNote;
