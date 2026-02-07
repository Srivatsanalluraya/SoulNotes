import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import entryRoutes from "./routes/entries.js";
import listRoutes from "./routes/list.js";
import aidostRoutes from "./routes/aidost.js";
  
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/entries", entryRoutes);
app.use("/api/list", listRoutes);
app.use("/api/aidost", aidostRoutes);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`AIDost Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});


process.on("exit", (code) => {
  console.log("❌ Server exited with code:", code);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});
