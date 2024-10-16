import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionRoutes);

export default app;
