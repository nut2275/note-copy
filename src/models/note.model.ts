import mongoose, { Schema, model, Types } from 'mongoose';

// Folder Schema
const folderSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Folder = model('Folder', folderSchema);

// Note Schema
const noteSchema = new Schema({
  folderId: { type: Types.ObjectId, ref: 'Folder', required: true },
  title: { type: String, required: false  },
  note: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Note = model('Note', noteSchema);
