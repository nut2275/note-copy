import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/user.routes";
import noteRoutes from "./routes/note.routes";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ ปิด CORS ถ้า frontend + backend จะอยู่โดเมนเดียวกัน
app.use(cors());

// ✅ ใช้ JSON
app.use(express.json());

// ✅ API Routes
// app.use("/api/users", userRoutes);
app.use("/appNotes", noteRoutes);

// ✅ 2) Serve React Build
// ✅ ชี้ไป build folder ถูกต้อง
const buildPath = path.join(__dirname, "../build");
console.log("Serving React build from:", buildPath);

app.use(express.static(buildPath));

app.get("/*", (_, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
