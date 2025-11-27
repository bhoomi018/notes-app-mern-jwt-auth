import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, addNote, updateNote, deleteNote } from '../features/notes/notesSlice';
import NoteItem from '../components/NoteItem';
import { logout } from '../features/auth/authSlice';

export default function NotesPage() {
  const dispatch = useDispatch();
  const notes = useSelector(s => s.notes.items);
  const loading = useSelector(s => s.notes.loading);
  const token = useSelector(s => s.auth.token);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => { if (token) dispatch(fetchNotes()); }, [token]);

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateNote({ id: editing._id, title, content }));
      setEditing(null);
    } else {
      dispatch(addNote({ title, content }));
    }
    setTitle(''); setContent('');
  };

  const startEdit = (note) => { setEditing(note); setTitle(note.title); setContent(note.content); };
  const doDelete = (id) => { dispatch(deleteNote(id)); };

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Your Notes</h2>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <form onSubmit={submit} style={{ marginBottom: 24 }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <br />
        <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        <br />
        <button>{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setTitle(''); setContent(''); }}>Cancel</button>}
      </form>

      {loading ? <p>Loading...</p> : notes.map(n => (
        <NoteItem key={n._id} note={n} onEdit={startEdit} onDelete={doDelete} />
      ))}
    </div>
  );
}
