// frontend/src/hooks/useEntryForm.ts
import { useEffect, useState } from 'react';
import { createEntry, fetchProjects, updateEntry } from './entryService';
import type { EntryFormData } from '../interfaces/EntryFormData';
import type { Project } from '../interfaces/Project';
import type { TimeEntry } from '../interfaces/TimeEntry';
import { validateEntry } from './validateEntry';

const init_state: EntryFormData = {
  date: new Date().toISOString().split('T')[0],
  project: '',
  hours: '',
  description: ''
};

export const useEntryForm = (entryToEdit: TimeEntry | null) => {
  const [formData, setFormData] = useState<EntryFormData>(init_state);
  const [projects, setProjects] = useState<Project[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    if (entryToEdit) {
      setFormData({
        date: entryToEdit.date.split('T')[0],
        project: entryToEdit.project.id,
        hours: String(entryToEdit.hours),
        description: entryToEdit.description || ''
      });
    } else {
      setFormData(init_state);
    }
  }, [entryToEdit]);
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };
  const submitForm = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateEntry(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (entryToEdit) {
        await updateEntry(entryToEdit.id, formData);
      } else {
        await createEntry(formData);
      }
      if (onSuccess) onSuccess();
      
    } catch (err: any) {
      setErrors([err.message || "Server error"]);
    } 
  }; 

  return { formData, projects, errors, handleChange, submitForm };
};