import React from 'react'
import './EntryForm.css'
import { useEntryForm } from './useEntryForm';
import type { TimeEntry } from '../interfaces/TimeEntry';

interface Props {
  onEntrySaved?: () => void;
  onCancelEdit: () => void;
  entryToEdit: TimeEntry | null;
}
const EntryForm: React.FC<Props> = ({ onEntrySaved,entryToEdit, onCancelEdit }) => {
  const { formData,projects, errors, handleChange, submitForm } = useEntryForm(entryToEdit);
const handleSubmit = (e: React.FormEvent) => {
    submitForm(e, onEntrySaved);
  };
  return (
    <div className="container">
      <div className="container__header">
        <h1 className="container__title">Mini Time Tracker</h1>
      </div>
      <div className="container__layout">
        <div className="card">
          <h2 className="card__title">Time record</h2>
          {errors.length > 0 && (
            <div className="alert alert-error">
              {errors.map((err, idx) => <p key={idx} style={{margin: 0}}>{err}</p>)}
            </div>
          )}
          <form className='form' onSubmit={handleSubmit}>
            <div className="form__input">
              <label className="form__label">Date</label>
              <input type="date" className="form__date"name="date" value={formData.date} onChange={handleChange}
              />
            </div>

         <div className="form__input">
              <label className="form__label">Project</label>
              <select className="form__select" name="project" value={formData.project} onChange={handleChange}>
                <option value="">Choose a project...</option>
                {projects.map(proj => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>
              <div className="form__input">
              <label className="form__label">Hours</label>
              <input  name="hours" value={formData.hours} onChange={handleChange} type="number"  step="0.25"  className="form__hour" placeholder="Enter hours"/>
             </div>
            <div className="form__input">
              <label className="form__label">Work description</label>
              <textarea  placeholder="Enter a work description.."  rows={4} className="form__textarea" name="description" value={formData.description} onChange={handleChange}/>
            </div>
            <button className="btn-save" type="submit">Save</button>
          {entryToEdit && (<button  type="button"  className="btn-save"  onClick={onCancelEdit}>Cancel</button>)}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;