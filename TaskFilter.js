import React from 'react';

function TaskFilter({ filter, setFilter, counts }) {
  return (
    <div className="task-filter">
      {Object.keys(counts).map(key => (
        <button
          key={key}
          className={filter === key ? 'active' : ''}
          onClick={() => setFilter(key)}
        >
          {key} ({counts[key]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter; 