import { useState, useEffect } from 'react';
import { deleteEntry, fetchEntries } from '../EntryForm/entryService';
import type { TimeEntry } from '../interfaces/TimeEntry';

export const useEntryHistory = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateIndex, setDateIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<TimeEntry | null>(null);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const uniqueDates = Array.from(new Set(entries.map(e => e.date.split('T')[0]))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  useEffect(() => {
    if (dateIndex >= uniqueDates.length && uniqueDates.length > 0) {
      setDateIndex(0);
    }
  }, [uniqueDates.length, dateIndex]);
  const currentDateISO = uniqueDates[dateIndex];
  const currentDayEntries = entries.filter(e => e.date.startsWith(currentDateISO));
  const grandTotal = entries.reduce((sum, e) => sum + e.hours, 0);
  const dailyTotal = currentDayEntries.reduce((sum, e) => sum + e.hours, 0);

  const handleCreate = () => {
    setEntryToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (entry: TimeEntry) => {
    setEntryToEdit(entry);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEntryToEdit(null);
  };

  const handleSaved = () => {
    loadData();
    handleCloseForm();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Видалити цей запис?")) {
      try {
        await deleteEntry(id);
        await loadData();
      } catch (e) {
        alert("Не вдалося видалити запис");
      }
    }
  };

  const goPrev = () => {
    if (dateIndex < uniqueDates.length - 1) setDateIndex(prev => prev + 1);
  };

  const goNext = () => {
    if (dateIndex > 0) setDateIndex(prev => prev - 1);
  };

  return {
    entries,loading,grandTotal,uniqueDates,currentDateISO,currentDayEntries,dailyTotal,dateIndex,isFormVisible,entryToEdit,handleCreate,handleEdit,handleCloseForm,handleSaved,handleDelete,goPrev,goNext
  };
};