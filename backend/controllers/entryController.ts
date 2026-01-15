import { Request, Response } from 'express';
import { TimeEntry } from '@prisma/client';
import prisma from '../prisma';


export const getEntries = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.timeEntry.findMany({
      orderBy: { createdAt: 'desc' },
      include: { project: true }
    });
    res.json(entries);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createEntry = async (req: Request, res: Response) => {
  const { projectId, date, hours, description } = req.body;
  try {
    const entryDate = new Date(date);
    const startOfDay = new Date(entryDate); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(entryDate); endOfDay.setHours(23, 59, 59, 999);

    const existingEntries = await prisma.timeEntry.findMany({
      where: { date: { gte: startOfDay, lte: endOfDay } }
    });

    const totalHours = existingEntries.reduce((sum: number, item: TimeEntry) => sum + item.hours, 0);
    const newHours = Number(hours);

    if (totalHours + newHours > 24) {
      res.status(400).json({
        error: `Day limit exceeded. Used: ${totalHours}h. Trying to add: ${newHours}h.`
      });
      return; 
    }

    const result = await prisma.timeEntry.create({
      data: {
        projectId,
        date: entryDate,
        hours: newHours,
        description
      }
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    await prisma.timeEntry.delete({ where: { id: id } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

export const updateEntry = async (req: Request, res: Response) => {
 const { id } = req.params as { id: string };
  const { projectId, date, hours, description } = req.body;
  try {
    const entryDate = new Date(date);
    const updatedEntry = await prisma.timeEntry.update({
      where: { id: id },
      data: {
        projectId,
        date: entryDate,
        hours: Number(hours),
        description
      }
    });
    res.json(updatedEntry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update entry" });
  }
};