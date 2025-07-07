import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { getLocalStorageData, setLocalStorageData } from '../utils/localStorage';

const FILTERS = {
  ALL: 'All',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
};


function TaskDashboard({ username, onLogout }) {
  const [tasks, setTasks] = useState(() => getLocalStorageData());

  const [filter, setFilter] = useState(FILTERS.ALL);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  setLocalStorageData(tasks);

  const addTask = (task) => setTasks([task, ...tasks]);
  const updateTask = (updatedTask) => setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const filteredTasks =
    (filter === FILTERS.ALL ? tasks :
      filter === FILTERS.COMPLETED ? tasks.filter(t => t.completed) :
        tasks.filter(t => !t.completed))
      .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const counts = {
    [FILTERS.ALL]: tasks.length,
    [FILTERS.COMPLETED]: tasks.filter(t => t.completed).length,
    [FILTERS.PENDING]: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="dashboard-container">
      <header>
        <div className="user-info">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <h2>{username}'s Task Dashboard</h2>
        </div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button onClick={onLogout}>Logout</button>
          <button onClick={() => setDarkMode(dm => !dm)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} style={{fontSize: '1.3em', padding: '0.5em 0.8em'}}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <TaskForm onAdd={addTask} />
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '60%', marginBottom: '1rem', padding: '0.7rem 1rem', borderRadius: 8, border: '1.5px solid #d1d5db', fontSize: '1.05rem' }}
      />
      <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default TaskDashboard; 