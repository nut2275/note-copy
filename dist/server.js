"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// ✅ ปิด CORS ถ้า frontend + backend จะอยู่โดเมนเดียวกัน
app.use((0, cors_1.default)());
// ✅ ใช้ JSON
app.use(express_1.default.json());
// ✅ API Routes
// app.use("/api/users", userRoutes);
app.use("/appNotes", note_routes_1.default);

// ✅ 2) Serve React Build
// ✅ ชี้ไป build folder ถูกต้อง
// const buildPath = path_1.default.join(__dirname, "../build");
// console.log("Serving React build from:", buildPath);
// app.use(express_1.default.static(buildPath));
// app.get("/*", (_, res) => {
//     res.sendFile(path_1.default.join(buildPath, "index.html"));
// });

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
