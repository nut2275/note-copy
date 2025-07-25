import { Request, Response } from 'express';
import { Note, Folder } from '../models/note.model';

export const getNote = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ folderId: req.params.folderId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notes.' });
  }
};

export const getFolder = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get folders.' });
  }
};

export const createFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ message: 'Folder name is required and cannot be empty.' });
      return;
    }

    const newFolder = new Folder({ name: name.trim() });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create folder.' });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    // const folderId: string = req.params.folderId;
    const { title, note, folderId} = req.body;

    if (!folderId || (!title?.trim() && !note?.trim())) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const newNote = new Note({ folderId, title, note });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note.' });
  }
};

export const deleteFolder = async (req: Request, res: Response): Promise<void> => {
  const folderId = req.params.id;

  try {
    // ✅ ลบโน้ตทั้งหมดใน folder นี้
    await Note.deleteMany({ folderId });
    //  ลบ folder
    const deletedFolder = await Folder.findByIdAndDelete(folderId);

    if (!deletedFolder) {
      res.status(404).json({ message: 'Folder not found.' });
      return;
    }

    res.status(200).json({ message: 'Folder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  
  const noteId = req.params.id;
  try {
    // ถ้าไม่มี id
    if (!noteId) {
      res.status(400).json({ message: 'Note ID is required' });
      return;
    }

    const deleted = await Note.findByIdAndDelete(noteId);

    if (!deleted) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.status(200).json({ message: 'Note deleted successfully', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};


export const updateFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const folderId = req.params.id; // รับ id จาก URL parameter
    const { name } = req.body;      // รับข้อมูลที่ต้องการอัพเดตจาก body

    // Validate ชื่อโฟลเดอร์
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ message: 'Folder name is required and cannot be empty.' });
      return;
    }

    // update ด้วย findByIdAndUpdate พร้อม option { new: true } เพื่อคืนค่าอัพเดตล่าสุด
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { name: name.trim() },
      { new: true }
    );

    if (!updatedFolder) {
      res.status(404).json({ message: 'Folder not found.' });
      return;
    }

    res.status(200).json(updatedFolder);
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id = req.params.id; // รับ id จาก URL param
    const { title, note } = req.body; // รับค่าที่ต้องการอัปเดต

    // หาโน้ตตาม id
    const existingNote = await Note.findById(_id);
    if (!existingNote) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    // อัปเดตค่า
    existingNote.title = title ?? existingNote.title;
    existingNote.note = note ?? existingNote.note;
    existingNote.updatedAt = new Date();

    // บันทึก
    const updatedNote = await existingNote.save();

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update note' });
  }
};