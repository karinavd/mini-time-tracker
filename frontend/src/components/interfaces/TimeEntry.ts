import type { Project } from "./Project";

export interface TimeEntry {
  id: string;
  date: string;
  hours: number;
  description: string | null;
  project: Project;
}