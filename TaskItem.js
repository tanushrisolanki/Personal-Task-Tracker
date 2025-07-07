import React, { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleToggle = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };
  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate({ ...task, title: editTitle.trim(), description: editDescription.trim() });
    setIsEditing(false);
  };
  const handleDelete = () => {
    if (window.confirm('Delete this task?')) onDelete(task.id);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : 'pending'}${isEditing ? ' editing' : ''}`}>
      {isEditing ? (
        <>
          <div className="edit-row">
            <input type="checkbox" checked={task.completed} onChange={handleToggle} />
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
              placeholder="Task title"
            />
            <input
              type="text"
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
            />
          </div>
          
          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <input type="checkbox" checked={task.completed} onChange={handleToggle} />
          <span className="task-title">{task.title}</span>
          {task.description && <span className="task-desc">{task.description}</span>}
          <span className={`priority-label ${task.priority ? task.priority.toLowerCase() : 'medium'}`}>{task.priority}</span>
          <span className="task-date">{new Date(task.createdAt).toLocaleString()}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          {task.dueDate && (
            <div className="task-due" style={{display:'block', marginTop:'0.5em', fontSize:'0.98em', color:'#1976d2'}}>
              Due: {task.dueDate}
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default TaskItem; 