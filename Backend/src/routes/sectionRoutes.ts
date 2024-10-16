import express from "express";
import {
  addSubsection,
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "../controllers/sectionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createSection);
router.get("/", authMiddleware, getSections);
router.put("/:sectionId", authMiddleware, updateSection);
router.delete("/:sectionId", authMiddleware, deleteSection);
router.post("/:sectionId/subsections", authMiddleware, addSubsection);

export default router;
