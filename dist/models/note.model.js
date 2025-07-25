"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Folder = void 0;
const mongoose_1 = require("mongoose");
// Folder Schema
const folderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Folder = (0, mongoose_1.model)('Folder', folderSchema);
// Note Schema
const noteSchema = new mongoose_1.Schema({
    folderId: { type: mongoose_1.Types.ObjectId, ref: 'Folder', required: true },
    title: { type: String, required: false },
    note: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.Note = (0, mongoose_1.model)('Note', noteSchema);
