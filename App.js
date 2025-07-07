import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  return (
    <div className="App">
      {username ? (
        <TaskDashboard username={username} onLogout={() => { setUsername(''); localStorage.removeItem('username'); }} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
