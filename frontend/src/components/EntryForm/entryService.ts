import type { EntryFormData } from "../interfaces/EntryFormData";
import type { Project } from "../interfaces/Project";
import type { TimeEntry } from "../interfaces/TimeEntry";

export const createEntry = async (formData: EntryFormData) => {
  const response = await fetch('http://localhost:4000/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        date: formData.date,
        description: formData.description,
         projectId: formData.project,
        hours: Number(formData.hours)
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch('http://localhost:4000/projects');
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};


export const deleteEntry = async (id: string) => {
  const response = await fetch(`http://localhost:4000/entries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("Failed to delete entry");
  }
};
export const fetchEntries = async (): Promise<TimeEntry[]> => {
  const response = await fetch('http://localhost:4000/entries');
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return await response.json();
};

export const updateEntry = async (id: string, formData: EntryFormData) => {
  const response = await fetch(`http://localhost:4000/entries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date: formData.date,
      description: formData.description,
      projectId: formData.project,
      hours: Number(formData.hours)
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update");
  }
  return data;
};