import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readDB, writeDB } from "../db"; 

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const createSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  try {
    const db = await readDB(); 

    const newSection = { id: uuidv4(), name, subsections: [], userId };

    db.sections.push(newSection);

    await writeDB(db);

    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: "Error creating section" });
  }
};

export const getSections = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  try {
    const db = await readDB(); 

    const sections = db.sections.filter((section) => section.userId === userId);

    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sections" });
  }
};
export const updateSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { sectionId } = req.params;
  const { name } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  try {
    const db = await readDB(); 

    const section = db.sections.find(
      (section) => section.id === sectionId && section.userId === userId
    );
    if (!section) {
      res.status(404).json({ message: "Section not found" });
      return;
    }

    section.name = name;

    await writeDB(db);

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Error updating section" });
  }
};

const findSectionRecursively = (sections: any[], sectionId: string): any => {
  for (const section of sections) {
    if (section.id === sectionId) {
      return section;
    }
    const foundInSubsections = findSectionRecursively(
      section.subsections,
      sectionId
    );
    if (foundInSubsections) {
      return foundInSubsections;
    }
  }
  return null;
};

const deleteSectionRecursively = (sections: any[], sectionId: string) => {
  return sections.filter((section) => {
    if (section.id === sectionId) return false;
    section.subsections = deleteSectionRecursively(
      section.subsections,
      sectionId
    );
    return true;
  });
};

export const addSubsection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { sectionId } = req.params;
  const { name } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  try {
    const db = await readDB();

    const section = findSectionRecursively(db.sections, sectionId);
    if (!section) {
      res.status(404).json({ message: "Section not found" });
      return;
    }

    const newSubsection = { id: uuidv4(), name, subsections: [] };

    section.subsections.push(newSubsection);

    await writeDB(db);

    res.status(201).json(newSubsection);
  } catch (error) {
    res.status(500).json({ message: "Error adding subsection", error });
  }
};

export const deleteSection = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { sectionId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  try {
    const db = await readDB();

    db.sections = deleteSectionRecursively(db.sections, sectionId);

    await writeDB(db);

    res.status(200).json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting section", error });
  }
};
