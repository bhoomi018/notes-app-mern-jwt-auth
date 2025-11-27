import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const fetchNotes = createAsyncThunk('notes/fetch', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try { return await api('http://localhost:5000/notes', { token }); }
  catch (err) { return rejectWithValue(err.message || err); }
});

export const addNote = createAsyncThunk('notes/add', async ({ title, content }, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try { return await api('http://localhost:5000/notes', { method: 'POST', body: { title, content }, token }); }
  catch (err) { return rejectWithValue(err.message || err); }
});

export const updateNote = createAsyncThunk('notes/update', async ({ id, title, content }, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try { return await api(`http://localhost:5000/notes/${id}`, { method: 'PUT', body: { title, content }, token }); }
  catch (err) { return rejectWithValue(err.message || err); }
});

export const deleteNote = createAsyncThunk('notes/delete', async (id, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try { await api(`http://localhost:5000/notes/${id}`, { method: 'DELETE', token }); return id; }
  catch (err) { return rejectWithValue(err.message || err); }
});

const slice = createSlice({
  name: 'notes',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchNotes.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchNotes.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(addNote.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(addNote.rejected, (s, a) => { s.error = a.payload; })

      .addCase(updateNote.fulfilled, (s, a) => {
        s.items = s.items.map(it => it._id === a.payload._id ? a.payload : it);
      })
      .addCase(deleteNote.fulfilled, (s, a) => {
        s.items = s.items.filter(it => it._id !== a.payload);
      });
  }
});

export default slice.reducer;
