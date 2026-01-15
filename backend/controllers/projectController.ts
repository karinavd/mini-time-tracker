
import { Request, Response } from 'express';
import prisma from '../prisma';
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};