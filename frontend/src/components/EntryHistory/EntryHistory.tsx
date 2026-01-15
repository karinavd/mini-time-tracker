import React from 'react';
import './EntryHistory.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EntryForm from '../EntryForm/EntryForm';
import { formatDate, formatDuration } from '../../utils/timeUtils';
import { useEntryHistory } from './useEntryHistory';

const EntryHistory: React.FC = () => {
  const { loading, uniqueDates, currentDateISO, currentDayEntries,grandTotal, dailyTotal, dateIndex, isFormVisible, entryToEdit, handleCreate, handleEdit, handleCloseForm, handleSaved, handleDelete, goPrev, goNext } = useEntryHistory();

  if (loading && uniqueDates.length === 0) return <div className="history">Loading...</div>;

  return (
    <>
      {isFormVisible && (
        <div className="modal" onClick={handleCloseForm}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <EntryForm onEntrySaved={handleSaved} entryToEdit={entryToEdit} onCancelEdit={handleCloseForm} />
          </div>
        </div>
      )}

      <div className="history">
        <div className="history__header">
          <div className="history__tools">
             <h2 className="history__title">Entry History</h2>
             <button className="history__add-btn" onClick={handleCreate}><AddIcon fontSize="small" /></button>
          </div>
          <div className="history__badge">Daily Total: {formatDuration(dailyTotal)}
            <br />
            Total for all time: {formatDuration(grandTotal)}
          </div>
        </div>

        {uniqueDates.length === 0 ? <div className="history__empty">No entries yet</div> : (
          <>
            <div className="date-nav">
              <button className="date-nav__btn date-nav__btn--prev" onClick={goPrev} disabled={dateIndex >= uniqueDates.length - 1}><ArrowLeftIcon /></button>
              <div className="date-nav__info">
                <div className="date-nav__current">{formatDate(currentDateISO)}</div>
                <div className="date-nav__counter">Day {uniqueDates.length - dateIndex} of {uniqueDates.length}</div>
              </div>
              <button className="date-nav__btn date-nav__btn--next" onClick={goNext} disabled={dateIndex <= 0}><ArrowRightIcon /></button>
            </div>

            <div className="history__list">
              {currentDayEntries.map(entry => (
                <div key={entry.id} onDoubleClick={() => handleEdit(entry)} className="entry" title="Double click to edit">
                  <div className="entry__content">
                    <div className="entry__project">{entry.project.name}</div>
                    <div className="entry__hours">{formatDuration(entry.hours)}</div>
                    <div className="entry__desc">{entry.description}</div>
                  </div>
                  <button className="entry__delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}><DeleteIcon/></button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EntryHistory;