import type { EntryFormData } from "../interfaces/EntryFormData";

export const validateEntry = (formData: EntryFormData): string[] => {
  const h = Number(formData.hours);
  switch (true) {
    case !formData.date:
      return ["Date is required"];

    case !formData.project:
      return ["Project is required"];

    case !formData.hours:
      return ["Hours are required"];

    case isNaN(h) || h <= 0:
      return ["Hours must be positive"];

    case h > 24:
      return ["Hours cannot exceed 24"];
    default:
      return [];
  }
};