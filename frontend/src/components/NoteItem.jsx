import React from 'react';

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
}
