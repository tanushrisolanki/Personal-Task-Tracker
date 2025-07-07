const taskKey="react-tasks";

export const getLocalStorageData = () => {
  const stored = localStorage.getItem(taskKey);
  return stored ? JSON.parse(stored) : [];
};

export const setLocalStorageData = (tasks) => {
  return localStorage.setItem(taskKey, JSON.stringify(tasks));
};
