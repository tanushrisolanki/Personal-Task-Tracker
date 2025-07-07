import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) return <p className="empty-list">No tasks to show.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList; 