import express from 'express';
import cors from 'cors';
import { getProjects } from './controllers/projectController';
import { createEntry, deleteEntry, getEntries, updateEntry } from './controllers/entryController';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/projects', getProjects);
app.get('/entries', getEntries);
app.post('/entries', createEntry);
app.delete('/entries/:id', deleteEntry);
app.put('/entries/:id', updateEntry);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));